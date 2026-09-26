import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'content', 'global-success')

def validate_all():
    print(f"=== VALIDATING GLOBAL SUCCESS DATASET AT {DATA_DIR} ===")
    
    all_vocab_ids = set()
    all_grammar_ids = set()
    all_question_ids = set()
    all_reading_ids = set()
    all_ids = set()
    
    question_prompts = set()
    
    errors = []
    warnings = []
    unit_stats = []

    grades = [10, 11, 12]
    
    total_units = 0
    total_vocab = 0
    total_grammar = 0
    total_reading = 0
    total_questions = 0

    for g in grades:
        g_dir = os.path.join(DATA_DIR, f'grade-{g}')
        if not os.path.exists(g_dir):
            continue
        
        unit_files = sorted([f for f in os.listdir(g_dir) if f.startswith('unit-') and f.endswith('.json')])
        
        for uf in unit_files:
            total_units += 1
            path = os.path.join(g_dir, uf)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
            except Exception as e:
                errors.append(f"[{path}] JSON parse error: {str(e)}")
                continue

            # Validate top-level structure
            for req_key in ['metadata', 'vocabulary', 'grammar', 'reading', 'skills', 'questions']:
                if req_key not in data:
                    errors.append(f"[{uf}] Missing top-level key: {req_key}")

            meta = data.get('metadata', {})
            unit_id = meta.get('unit_id', '')
            if not re.match(r'^g(10|11|12)-u(0[1-9]|10)$', unit_id):
                errors.append(f"[{uf}] Invalid unit_id format: '{unit_id}'")

            unit_vocab_ids = set()
            unit_grammar_ids = set()

            # Vocabulary
            for idx, v in enumerate(data.get('vocabulary', [])):
                total_vocab += 1
                vid = v.get('id', '')
                if not re.match(r'^g(10|11|12)-u(0[1-9]|10)-vocab-[0-9]{3}$', vid):
                    errors.append(f"[{uf}] Invalid vocab id format: '{vid}'")
                if vid in all_ids:
                    errors.append(f"[{uf}] Duplicate ID globally: '{vid}'")
                all_ids.add(vid)
                all_vocab_ids.add(vid)
                unit_vocab_ids.add(vid)

                # Check required fields
                for fld in ['word', 'word_type', 'meaning_vi', 'definition_en', 'example_sentence', 'example_translation', 'source_file', 'pdf_page', 'provenance', 'ocr_confidence', 'review_status']:
                    if fld not in v:
                        errors.append(f"[{uf}] Vocab item {vid} missing field: {fld}")

                # Check OCR confidence vs review status rule
                if v.get('ocr_confidence', 1.0) < 0.85 and v.get('review_status') == 'verified':
                    errors.append(f"[{uf}] Vocab {vid} has ocr_confidence < 0.85 but marked 'verified'")

            # Grammar
            for idx, g_item in enumerate(data.get('grammar', [])):
                total_grammar += 1
                gid = g_item.get('id', '')
                if not re.match(r'^g(10|11|12)-u(0[1-9]|10)-grammar-[0-9]{3}$', gid):
                    errors.append(f"[{uf}] Invalid grammar id format: '{gid}'")
                if gid in all_ids:
                    errors.append(f"[{uf}] Duplicate ID globally: '{gid}'")
                all_ids.add(gid)
                all_grammar_ids.add(gid)
                unit_grammar_ids.add(gid)

                for fld in ['title', 'structure_name', 'rule_summary', 'formula', 'example_sentences', 'common_mistakes', 'source_file', 'pdf_page', 'provenance', 'ocr_confidence', 'review_status']:
                    if fld not in g_item:
                        errors.append(f"[{uf}] Grammar item {gid} missing field: {fld}")

                if g_item.get('ocr_confidence', 1.0) < 0.85 and g_item.get('review_status') == 'verified':
                    errors.append(f"[{uf}] Grammar {gid} has ocr_confidence < 0.85 but marked 'verified'")

            # Reading
            r_item = data.get('reading', {})
            if r_item:
                total_reading += 1
                rid = r_item.get('id', '')
                if not re.match(r'^g(10|11|12)-u(0[1-9]|10)-reading-[0-9]{3}$', rid):
                    errors.append(f"[{uf}] Invalid reading id format: '{rid}'")
                if rid in all_ids:
                    errors.append(f"[{uf}] Duplicate ID globally: '{rid}'")
                all_ids.add(rid)
                all_reading_ids.add(rid)

                # Check game_questions in reading
                for q_idx, rq in enumerate(r_item.get('game_questions', [])):
                    if rq.get('correctAnswer') not in rq.get('options', []):
                        errors.append(f"[{uf}] Reading game question {q_idx+1}: correctAnswer '{rq.get('correctAnswer')}' not in options")

            # Skills
            skills = data.get('skills', {})
            for sk in ['listening', 'speaking', 'writing']:
                if sk not in skills:
                    warnings.append(f"[{uf}] Skills section missing '{sk}'")

            # Questions
            for idx, q in enumerate(data.get('questions', [])):
                total_questions += 1
                qid = q.get('id', '')
                if not re.match(r'^g(10|11|12)-u(0[1-9]|10)-question-[0-9]{3}$', qid):
                    errors.append(f"[{uf}] Invalid question id format: '{qid}'")
                if qid in all_ids:
                    errors.append(f"[{uf}] Duplicate ID globally: '{qid}'")
                all_ids.add(qid)
                all_question_ids.add(qid)

                # Check prompt duplicate
                norm_prompt = re.sub(r'\s+', ' ', q.get('prompt', '').strip().lower())
                if norm_prompt in question_prompts:
                    errors.append(f"[{uf}] Duplicate question prompt: '{q.get('prompt')[:50]}...'")
                question_prompts.add(norm_prompt)

                # Check knowledgeItemIds links
                kids = q.get('knowledgeItemIds', [])
                if not kids:
                    errors.append(f"[{uf}] Question {qid} has empty knowledgeItemIds")
                for kid in kids:
                    if kid not in unit_vocab_ids and kid not in unit_grammar_ids:
                        errors.append(f"[{uf}] Question {qid} links to non-existent knowledgeItemId '{kid}' in unit")

                # Check answers and options
                qtype = q.get('type')
                ans = q.get('correctAnswer')
                opts = q.get('options', [])

                if qtype == 'multiple_choice':
                    if ans not in opts:
                        errors.append(f"[{uf}] Question {qid} (MCQ): correctAnswer '{ans}' is not in options: {opts}")
                    if len(opts) < 2:
                        errors.append(f"[{uf}] Question {qid} has fewer than 2 options")
                elif qtype == 'sentence_order':
                    wto = q.get('wordsToOrder', [])
                    if not wto:
                        errors.append(f"[{uf}] Question {qid} (sentence_order) is missing wordsToOrder")
                elif qtype == 'fill_blank':
                    if not ans or len(ans.strip()) == 0:
                        errors.append(f"[{uf}] Question {qid} (fill_blank) has empty correctAnswer")

            unit_stats.append({
                'unit_id': unit_id,
                'title': meta.get('title'),
                'vocab_count': len(data.get('vocabulary', [])),
                'grammar_count': len(data.get('grammar', [])),
                'question_count': len(data.get('questions', [])),
                'review_status': meta.get('review_status')
            })

    print(f"\nTotal Units scanned: {total_units}")
    print(f"Total Vocab Items: {total_vocab}")
    print(f"Total Grammar Items: {total_grammar}")
    print(f"Total Reading Items: {total_reading}")
    print(f"Total Questions: {total_questions}")
    print(f"Errors count: {len(errors)}")
    print(f"Warnings count: {len(warnings)}")

    if errors:
        print("\n--- VALIDATION ERRORS ---")
        for err in errors[:30]:
            print("  [ERROR]", err)
        if len(errors) > 30:
            print(f"  ... and {len(errors) - 30} more errors")
    else:
        print("\n>>> ALL VALIDATION CHECKS PASSED SUCCESSFULLY! <<<")

    return len(errors) == 0

if __name__ == '__main__':
    success = validate_all()
    sys.exit(0 if success else 1)
