import { describe, it, expect, vi } from 'vitest';
import { PronunciationService } from '../src/services/pronunciationService';
import { ALL_PRONUNCIATION_DATA } from '../src/data/pronunciationData';
import { speechService } from '../src/services/speechService';
import { GuardianService } from '../src/services/guardianService';
import { ALL_LEVEL_CONFIGS } from '../src/game/levels/levelConfig';

describe('Global Success Pronunciation Curriculum & Audio Verification', () => {
  it('1. Đảm bảo toàn bộ 30 Unit đều có dữ liệu phát âm chuẩn SGK Global Success (Lớp 10, 11, 12)', () => {
    const allUnitIds = Object.keys(ALL_LEVEL_CONFIGS);
    expect(allUnitIds.length).toBe(30);

    allUnitIds.forEach((unitId) => {
      const data = PronunciationService.getPronunciationByUnit(unitId);
      expect(data, `Unit ${unitId} missing pronunciation data`).toBeDefined();
      expect(data.unitId).toBe(unitId);
      expect(data.focusTopic, `Unit ${unitId} missing focusTopic`).toBeTruthy();
      expect(data.focusTopicEn, `Unit ${unitId} missing focusTopicEn`).toBeTruthy();
      expect(data.wuxiaSecretName, `Unit ${unitId} missing wuxiaSecretName`).toBeTruthy();
      expect(data.ruleSummary.length, `Unit ${unitId} ruleSummary too short`).toBeGreaterThan(20);
      expect(data.mouthGuide.length, `Unit ${unitId} mouthGuide too short`).toBeGreaterThan(15);
      expect(data.targetSounds.length, `Unit ${unitId} missing target sounds`).toBeGreaterThanOrEqual(1);

      // Kiểm tra danh sách từ luyện âm
      expect(data.practiceWords.length, `Unit ${unitId} practice words too few`).toBeGreaterThanOrEqual(3);
      data.practiceWords.forEach((pw) => {
        expect(pw.word).toBeTruthy();
        expect(pw.ipa).toMatch(/^\/.*\/|\[.*\]$/); // Định dạng chuẩn IPA hoặc chú âm
        expect(pw.meaningVi).toBeTruthy();
        expect(pw.targetSound).toBeTruthy();
      });

      // Kiểm tra câu hỏi khảo hạch phát âm
      expect(data.challengeQuestion).toBeDefined();
      expect(data.challengeQuestion.prompt).toBeTruthy();
      expect(data.challengeQuestion.options.length).toBeGreaterThanOrEqual(3);
      expect(data.challengeQuestion.options).toContain(data.challengeQuestion.correctAnswer);
      expect(data.challengeQuestion.explanation).toBeTruthy();
    });
  });

  it('2. Kiểm tra tính chính xác của các chủ đề phát âm trọng tâm theo từng khối lớp', () => {
    // Grade 10 Unit 1: Phụ âm ghép /br/, /kr/, /tr/
    const g10u01 = PronunciationService.getPronunciationByUnit('g10-u01');
    expect(g10u01.focusTopic).toContain('/br/, /kr/, /tr/');
    expect(g10u01.practiceWords.some((w) => w.word === 'breadwinner')).toBe(true);

    // Grade 10 Unit 3: Trọng âm từ 2 âm tiết
    const g10u03 = PronunciationService.getPronunciationByUnit('g10-u03');
    expect(g10u03.focusTopic).toContain('Trọng âm');

    // Grade 11 Unit 1: Dạng mạnh và dạng yếu của trợ động từ
    const g11u01 = PronunciationService.getPronunciationByUnit('g11-u01');
    expect(g11u01.focusTopic).toContain('Dạng mạnh và dạng yếu');

    // Grade 11 Unit 3: Nối âm phụ âm sang nguyên âm
    const g11u03 = PronunciationService.getPronunciationByUnit('g11-u03');
    expect(g11u03.focusTopic).toContain('Nối âm');

    // Grade 12 Unit 1: Nguyên âm đôi /eɪ/ và /aʊ/
    const g12u01 = PronunciationService.getPronunciationByUnit('g12-u01');
    expect(g12u01.focusTopic).toContain('/eɪ/');

    // Grade 12 Unit 6: Từ đồng âm (Homophones)
    const g12u06 = PronunciationService.getPronunciationByUnit('g12-u06');
    expect(g12u06.focusTopic).toContain('đồng âm');
  });

  it('3. Kiểm tra tính năng tìm kiếm từ vựng phát âm của PronunciationService', () => {
    const searchRes = PronunciationService.searchWords('breadwinner');
    expect(searchRes.length).toBeGreaterThan(0);
    expect(searchRes[0].word).toBe('breadwinner');
    expect(searchRes[0].unitId).toBe('g10-u01');

    const searchIpa = PronunciationService.searchWords('/br/');
    expect(searchIpa.length).toBeGreaterThan(0);
  });

  it('4. Kiểm tra SpeechService hỗ trợ chuẩn hóa Accent và Standard Audio URL', () => {
    speechService.setAccent('en-GB');
    expect(speechService.getAccent()).toBe('en-GB');

    const gbUrl = speechService.getStandardAudioUrl('breadwinner', 'en-GB');
    expect(gbUrl).toContain('tl=en-GB');
    expect(gbUrl).toContain('q=breadwinner');

    speechService.setAccent('en-US');
    expect(speechService.getAccent()).toBe('en-US');

    const usUrl = speechService.getStandardAudioUrl('responsibility', 'en-US');
    expect(usUrl).toContain('tl=en-US');
    expect(usUrl).toContain('q=responsibility');
  });

  it('5. Kiểm tra nhiệm vụ Hộ Pháp Hoàng Vân tích hợp đồng bộ với chuẩn phát âm SGK qua 30 Unit', () => {
    const allUnitIds = Object.keys(ALL_LEVEL_CONFIGS);

    allUnitIds.forEach((unitId) => {
      const q = GuardianService.getGuardianQuestData('ho_phap_hoang_van', unitId);
      const pronData = PronunciationService.getPronunciationByUnit(unitId);

      expect(q.title).toContain(pronData.focusTopic);
      expect(q.tutorialGuidance).toContain(pronData.focusTopic);
      expect(q.tutorialGuidance).toContain(pronData.mouthGuide);
      expect(q.exercise.options).toContain(q.exercise.correctAnswer);
      expect(q.exercise.audioScript).toBeTruthy();
    });
  });
});
