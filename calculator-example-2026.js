/**
 * ═══════════════════════════════════════════════════════════════════
 * 2026년 사회보험료 계산기 (근로자 부담분)
 * ═══════════════════════════════════════════════════════════════════
 * 
 * @description 2026년 기준 4대보험 근로자 부담분 계산 함수
 * @param {number} monthlySalary - 보수월액 (원)
 * @param {string} employmentType - 고용형태 ('일용직', '정규직', '계약직')
 * @returns {Object} 공제 내역 객체
 */
function calculate_2026_social_insurance(monthlySalary, employmentType) {
    // 입력값 검증
    if (!monthlySalary || monthlySalary < 0) {
        throw new Error('보수월액은 0 이상이어야 합니다.');
    }
    
    if (!['일용직', '정규직', '계약직'].includes(employmentType)) {
        throw new Error('고용형태는 일용직, 정규직, 계약직 중 하나여야 합니다.');
    }

    // 일용직의 경우 고용보험만 부과
    if (employmentType === '일용직') {
        const 고용보험 = Math.round(monthlySalary * 0.009);
        
        return {
            국민연금: 0,
            건강보험: 0,
            장기요양: 0,
            고용보험: 고용보험,
            공제합계: 고용보험,
            예상실수령액: monthlySalary - 고용보험,
            계산상세: {
                보수월액: monthlySalary,
                고용형태: employmentType,
                계산식: {
                    고용보험: `${monthlySalary.toLocaleString()}원 × 0.9% = ${고용보험.toLocaleString()}원`
                }
            }
        };
    }
    
    // 정규직/계약직 4대보험 계산
    
    // 1. 국민연금 (4.75%, 상한 6,370,000원, 하한 400,000원)
    const 연금기준보수 = Math.max(400000, Math.min(monthlySalary, 6370000));
    const 국민연금 = Math.round(연금기준보수 * 0.0475);
    
    // 2. 건강보험 (3.595%)
    const 건강보험 = Math.round(monthlySalary * 0.03595);
    
    // 3. 장기요양보험 (건강보험료의 13.14%)
    const 장기요양 = Math.round(건강보험 * 0.1314);
    
    // 4. 고용보험 (0.9%)
    const 고용보험 = Math.round(monthlySalary * 0.009);
    
    // 총 공제액 및 실수령액
    const 공제합계 = 국민연금 + 건강보험 + 장기요양 + 고용보험;
    const 예상실수령액 = monthlySalary - 공제합계;
    
    return {
        국민연금,
        건강보험,
        장기요양,
        고용보험,
        공제합계,
        예상실수령액,
        계산상세: {
            보수월액: monthlySalary,
            고용형태: employmentType,
            계산식: {
                국민연금: `${연금기준보수.toLocaleString()}원 × 4.75% = ${국민연금.toLocaleString()}원`,
                건강보험: `${monthlySalary.toLocaleString()}원 × 3.595% = ${건강보험.toLocaleString()}원`,
                장기요양: `${건강보험.toLocaleString()}원 × 13.14% = ${장기요양.toLocaleString()}원`,
                고용보험: `${monthlySalary.toLocaleString()}원 × 0.9% = ${고용보험.toLocaleString()}원`
            },
            특이사항: 연금기준보수 !== monthlySalary ? 
                `국민연금 기준보수가 ${연금기준보수 < monthlySalary ? '하한' : '상한'}에 적용됨` : null
        }
    };
}

// ═══════════════════════════════════════════════════════════════════
// 사용 예제
// ═══════════════════════════════════════════════════════════════════

console.log('═══════════════════════════════════════════════════════════════════');
console.log('2026년 사회보험료 계산 예제');
console.log('═══════════════════════════════════════════════════════════════════\n');

// 예제 1: 월급 3,000,000원 정규직
console.log('📋 예제 1: 정규직 근로자 (월급 3,000,000원)');
console.log('───────────────────────────────────────────────────────────────────');
const 예제1 = calculate_2026_social_insurance(3000000, '정규직');
console.log(`보수월액:        ${예제1.계산상세.보수월액.toLocaleString()}원`);
console.log(`\n[공제 내역]`);
console.log(`• 국민연금:      ${예제1.국민연금.toLocaleString()}원  (${예제1.계산상세.계산식.국민연금})`);
console.log(`• 건강보험:      ${예제1.건강보험.toLocaleString()}원  (${예제1.계산상세.계산식.건강보험})`);
console.log(`• 장기요양:       ${예제1.장기요양.toLocaleString()}원  (${예제1.계산상세.계산식.장기요양})`);
console.log(`• 고용보험:       ${예제1.고용보험.toLocaleString()}원  (${예제1.계산상세.계산식.고용보험})`);
console.log(`\n공제액 합계:    ${예제1.공제합계.toLocaleString()}원`);
console.log(`실수령액:      ${예제1.예상실수령액.toLocaleString()}원`);
console.log('═══════════════════════════════════════════════════════════════════\n');

// 예제 2: 월급 2,000,000원 계약직
console.log('📋 예제 2: 계약직 근로자 (월급 2,000,000원)');
console.log('───────────────────────────────────────────────────────────────────');
const 예제2 = calculate_2026_social_insurance(2000000, '계약직');
console.log(`보수월액:        ${예제2.계산상세.보수월액.toLocaleString()}원`);
console.log(`\n[공제 내역]`);
console.log(`• 국민연금:       ${예제2.국민연금.toLocaleString()}원  (${예제2.계산상세.계산식.국민연금})`);
console.log(`• 건강보험:       ${예제2.건강보험.toLocaleString()}원  (${예제2.계산상세.계산식.건강보험})`);
console.log(`• 장기요양:        ${예제2.장기요양.toLocaleString()}원  (${예제2.계산상세.계산식.장기요양})`);
console.log(`• 고용보험:       ${예제2.고용보험.toLocaleString()}원  (${예제2.계산상세.계산식.고용보험})`);
console.log(`\n공제액 합계:     ${예제2.공제합계.toLocaleString()}원`);
console.log(`실수령액:      ${예제2.예상실수령액.toLocaleString()}원`);
console.log('═══════════════════════════════════════════════════════════════════\n');

// 예제 3: 일급 150,000원 일용직
console.log('📋 예제 3: 일용직 근로자 (일급 150,000원)');
console.log('───────────────────────────────────────────────────────────────────');
const 예제3 = calculate_2026_social_insurance(150000, '일용직');
console.log(`보수월액:          ${예제3.계산상세.보수월액.toLocaleString()}원`);
console.log(`\n[공제 내역]`);
console.log(`• 고용보험:         ${예제3.고용보험.toLocaleString()}원  (${예제3.계산상세.계산식.고용보험})`);
console.log(`\n공제액 합계:       ${예제3.공제합계.toLocaleString()}원`);
console.log(`실수령액:        ${예제3.예상실수령액.toLocaleString()}원`);
console.log(`\n💡 일용직은 고용보험만 부과됩니다.`);
console.log('═══════════════════════════════════════════════════════════════════\n');

// 예제 4: 국민연금 상한 초과 (월급 7,000,000원)
console.log('📋 예제 4: 고액 근로자 (월급 7,000,000원, 국민연금 상한 적용)');
console.log('───────────────────────────────────────────────────────────────────');
const 예제4 = calculate_2026_social_insurance(7000000, '정규직');
console.log(`보수월액:        ${예제4.계산상세.보수월액.toLocaleString()}원`);
console.log(`\n[공제 내역]`);
console.log(`• 국민연금:      ${예제4.국민연금.toLocaleString()}원  (${예제4.계산상세.계산식.국민연금})`);
console.log(`• 건강보험:      ${예제4.건강보험.toLocaleString()}원  (${예제4.계산상세.계산식.건강보험})`);
console.log(`• 장기요양:       ${예제4.장기요양.toLocaleString()}원  (${예제4.계산상세.계산식.장기요양})`);
console.log(`• 고용보험:       ${예제4.고용보험.toLocaleString()}원  (${예제4.계산상세.계산식.고용보험})`);
console.log(`\n공제액 합계:    ${예제4.공제합계.toLocaleString()}원`);
console.log(`실수령액:      ${예제4.예상실수령액.toLocaleString()}원`);
if (예제4.계산상세.특이사항) {
    console.log(`\n⚠️  ${예제4.계산상세.특이사항}`);
}
console.log('═══════════════════════════════════════════════════════════════════\n');

// 예제 5: 국민연금 하한 미달 (월급 300,000원)
console.log('📋 예제 5: 저액 근로자 (월급 300,000원, 국민연금 하한 적용)');
console.log('───────────────────────────────────────────────────────────────────');
const 예제5 = calculate_2026_social_insurance(300000, '계약직');
console.log(`보수월액:          ${예제5.계산상세.보수월액.toLocaleString()}원`);
console.log(`\n[공제 내역]`);
console.log(`• 국민연금:        ${예제5.국민연금.toLocaleString()}원  (${예제5.계산상세.계산식.국민연금})`);
console.log(`• 건강보험:        ${예제5.건강보험.toLocaleString()}원  (${예제5.계산상세.계산식.건강보험})`);
console.log(`• 장기요양:         ${예제5.장기요양.toLocaleString()}원  (${예제5.계산상세.계산식.장기요양})`);
console.log(`• 고용보험:         ${예제5.고용보험.toLocaleString()}원  (${예제5.계산상세.계산식.고용보험})`);
console.log(`\n공제액 합계:      ${예제5.공제합계.toLocaleString()}원`);
console.log(`실수령액:        ${예제5.예상실수령액.toLocaleString()}원`);
if (예제5.계산상세.특이사항) {
    console.log(`\n⚠️  ${예제5.계산상세.특이사항}`);
}
console.log('═══════════════════════════════════════════════════════════════════\n');

// ═══════════════════════════════════════════════════════════════════
// Node.js 환경에서 모듈로 사용
// ═══════════════════════════════════════════════════════════════════
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculate_2026_social_insurance };
}
