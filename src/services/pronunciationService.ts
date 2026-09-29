import { UnitPronunciationData, PronunciationPracticeWord } from '../types/pronunciation';
import { ALL_PRONUNCIATION_DATA } from '../data/pronunciationData';

export class PronunciationService {
  /**
   * Lấy toàn bộ dữ liệu phát âm chuẩn SGK của một Unit
   */
  static getPronunciationByUnit(unitId: string): UnitPronunciationData {
    if (ALL_PRONUNCIATION_DATA[unitId]) {
      return ALL_PRONUNCIATION_DATA[unitId];
    }
    // Fallback to Grade 10 Unit 1 if not found
    return ALL_PRONUNCIATION_DATA['g10-u01'];
  }

  /**
   * Lấy danh sách toàn bộ 30 Unit dữ liệu phát âm
   */
  static getAllPronunciationData(): UnitPronunciationData[] {
    return Object.values(ALL_PRONUNCIATION_DATA);
  }

  /**
   * Lấy danh sách từ luyện phát âm chuẩn của một Unit
   */
  static getPracticeWordsForUnit(unitId: string): PronunciationPracticeWord[] {
    const data = this.getPronunciationByUnit(unitId);
    return data.practiceWords || [];
  }

  /**
   * Tìm kiếm từ phát âm theo từ khóa tiếng Anh hoặc âm IPA
   */
  static searchWords(query: string): Array<PronunciationPracticeWord & { unitId: string; unitTitle: string }> {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: Array<PronunciationPracticeWord & { unitId: string; unitTitle: string }> = [];
    Object.values(ALL_PRONUNCIATION_DATA).forEach((unit) => {
      unit.practiceWords.forEach((pw) => {
        if (
          pw.word.toLowerCase().includes(q) ||
          pw.ipa.toLowerCase().includes(q) ||
          pw.targetSound.toLowerCase().includes(q) ||
          pw.meaningVi.toLowerCase().includes(q)
        ) {
          results.push({
            ...pw,
            unitId: unit.unitId,
            unitTitle: unit.unitTitle,
          });
        }
      });
    });

    return results;
  }
}
