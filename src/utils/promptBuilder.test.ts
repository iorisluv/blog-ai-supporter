import test from 'node:test';
import assert from 'node:assert/strict';
import { assembleRTCEPrompt, evaluatePromptQuality } from './promptBuilder.ts';

test('assembleRTCEPrompt formats all components into markdown structure', () => {
  const result = assembleRTCEPrompt({
    role: 'Giáo sư Kinh tế học',
    task: 'Giải thích mô hình IS-LM',
    context: 'Sinh viên năm 2 đang ôn thi cuối kỳ',
    constraints: ['Không dùng công thức quá phức tạp', 'Nêu ví dụ thực tế tại Việt Nam'],
    outputFormat: 'Gạch đầu dòng và tóm tắt ngắn'
  });

  assert.ok(result.includes('Giáo sư Kinh tế học'));
  assert.ok(result.includes('Giải thích mô hình IS-LM'));
  assert.ok(result.includes('Sinh viên năm 2 đang ôn thi cuối kỳ'));
  assert.ok(result.includes('1. Không dùng công thức quá phức tạp'));
  assert.ok(result.includes('2. Nêu ví dụ thực tế tại Việt Nam'));
});

test('evaluatePromptQuality gives low score for vague prompt', () => {
  const vague = 'Hãy viết bài tiểu luận về AI';
  const evalResult = evaluatePromptQuality(vague);
  assert.ok(evalResult.score < 50);
  assert.equal(evalResult.hasRole, false);
  assert.equal(evalResult.hasConstraints, false);
  assert.ok(evalResult.suggestions.length > 0);
});

test('evaluatePromptQuality recognizes complete RTCE prompt with high score', () => {
  const completePrompt = `Bạn là một chuyên gia nghiên cứu học thuật. Bối cảnh: tôi là sinh viên năm 3 làm tiểu luận.
Nhiệm vụ: phân tích ảnh hưởng của lạm phát. Yêu cầu ràng buộc: không được bịa đặt nguồn trích dẫn, nếu không chắc hãy nêu giả định. Định dạng đầu ra: bảng so sánh và danh sách các bước.`;
  const evalResult = evaluatePromptQuality(completePrompt);
  assert.ok(evalResult.score >= 85);
  assert.equal(evalResult.hasRole, true);
  assert.equal(evalResult.hasContext, true);
  assert.equal(evalResult.hasConstraints, true);
  assert.equal(evalResult.hasHallucinationSafeguards, true);
  assert.equal(evalResult.hasOutputFormat, true);
});
