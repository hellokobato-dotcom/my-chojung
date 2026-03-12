// ============================================
// 직원 관리 및 인건비 결산 시스템 v2.1.0 (Mock 데모 버전)
// 개선 사항:
// - Mock 데이터로 API 서버 없이 작동
// - LocalStorage를 사용한 데이터 저장
// - 완전한 CRUD 기능 지원
// ============================================

let employees = [];
let payments = [];
let currentPhotoFile = null;
let currentTab = 'employees';
let useMockData = true; // Mock 데이터 사용 플래그

// ============================================
// 페이지 로드 시 초기화
// ============================================
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 직원 관리 시스템 v2.1 (Mock 데모) 초기화 시작');
    
    // Mock 데이터 확인 및 초기화
    checkAndInitializeMockData();
    
    // 데이터 로드
    await loadEmployees();
    await loadPayments();
    
    // 사진 업로드 핸들러
    document.getElementById('photoInput').addEventListener('change', handlePhotoUpload);
    
    // 날짜 기본값 설정
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('paymentYear').value = new Date().getFullYear();
    document.getElementById('paymentMonth').value = new Date().getMonth() + 1;
    
    console.log('✅ 직원 관리 시스템 초기화 완료');
    
    // 환영 메시지
    setTimeout(() => {
        showSuccess('🎉 데모 버전에 오신 것을 환영합니다! 모든 기능을 자유롭게 테스트해보세요.');
    }, 1000);
});

// ============================================
// Mock 데이터 초기화
// ============================================
function checkAndInitializeMockData() {
    // LocalStorage에 데이터가 없으면 Mock 데이터 생성
    if (!localStorage.getItem('mock_employees')) {
        const mockEmployees = [
            {
                id: 'emp-001',
                name: '김철수',
                department: '현장',
                phone: '010-1234-5678',
                employment_type: '일용직',
                hourly_rate: 12000,
                monthly_salary: 0,
                bank_account: '국민은행 123-456-789012',
                hire_date: '2024-01-15',
                resign_date: null,
                status: '재직',
                photo_url: null
            },
            {
                id: 'emp-002',
                name: '이영희',
                department: '사무실',
                phone: '010-2345-6789',
                employment_type: '상용직',
                hourly_rate: 0,
                monthly_salary: 3200000,
                bank_account: '신한은행 987-654-321098',
                hire_date: '2023-06-01',
                resign_date: null,
                status: '재직',
                photo_url: null
            },
            {
                id: 'emp-003',
                name: '박민수',
                department: '현장',
                phone: '010-3456-7890',
                employment_type: '일용직',
                hourly_rate: 11800,
                monthly_salary: 0,
                bank_account: '우리은행 456-789-012345',
                hire_date: '2024-03-01',
                resign_date: null,
                status: '재직',
                photo_url: null
            },
            {
                id: 'emp-004',
                name: '정수진',
                department: '영업',
                phone: '010-4567-8901',
                employment_type: '상용직',
                hourly_rate: 0,
                monthly_salary: 2800000,
                bank_account: '하나은행 789-012-345678',
                hire_date: '2023-09-15',
                resign_date: null,
                status: '재직',
                photo_url: null
            },
            {
                id: 'emp-005',
                name: '최동욱',
                department: '현장',
                phone: '010-5678-9012',
                employment_type: '일용직',
                hourly_rate: 13000,
                monthly_salary: 0,
                bank_account: '기업은행 012-345-678901',
                hire_date: '2024-02-01',
                resign_date: '2024-02-28',
                status: '퇴직',
                photo_url: null
            }
        ];
        
        const mockPayments = [
            {
                id: 'pay-001',
                employee_id: 'emp-001',
                employee_name: '김철수',
                employment_type: '일용직',
                payment_date: '2026-02-28',
                payment_year: 2026,
                payment_month: 2,
                work_hours: 180,
                hourly_rate: 12000,
                monthly_salary: 0,
                base_salary: 2160000,
                deductions: 19440,
                national_pension: 0,
                health_insurance: 0,
                long_term_care: 0,
                employment_insurance: 19440,
                net_pay: 2140560,
                business_account_pay: 713520,
                personal_account_pay: 1427040,
                is_reported: '신고',
                notes: '2월 급여'
            },
            {
                id: 'pay-002',
                employee_id: 'emp-002',
                employee_name: '이영희',
                employment_type: '상용직',
                payment_date: '2026-02-28',
                payment_year: 2026,
                payment_month: 2,
                work_hours: 0,
                hourly_rate: 0,
                monthly_salary: 3200000,
                base_salary: 3200000,
                deductions: 273960,
                national_pension: 144000,
                health_insurance: 113440,
                long_term_care: 14691,
                employment_insurance: 28800,
                net_pay: 2926040,
                business_account_pay: 713520,
                personal_account_pay: 2212520,
                is_reported: '신고',
                notes: '2월 급여'
            },
            {
                id: 'pay-003',
                employee_id: 'emp-003',
                employee_name: '박민수',
                employment_type: '일용직',
                payment_date: '2026-02-28',
                payment_year: 2026,
                payment_month: 2,
                work_hours: 200,
                hourly_rate: 11800,
                monthly_salary: 0,
                base_salary: 2360000,
                deductions: 21240,
                national_pension: 0,
                health_insurance: 0,
                long_term_care: 0,
                employment_insurance: 21240,
                net_pay: 2338760,
                business_account_pay: 713520,
                personal_account_pay: 1625240,
                is_reported: '신고',
                notes: '2월 급여'
            },
            {
                id: 'pay-004',
                employee_id: 'emp-001',
                employee_name: '김철수',
                employment_type: '일용직',
                payment_date: '2026-03-11',
                payment_year: 2026,
                payment_month: 3,
                work_hours: 80,
                hourly_rate: 12000,
                monthly_salary: 0,
                base_salary: 960000,
                deductions: 8640,
                national_pension: 0,
                health_insurance: 0,
                long_term_care: 0,
                employment_insurance: 8640,
                net_pay: 951360,
                business_account_pay: 713520,
                personal_account_pay: 237840,
                is_reported: '미신고',
                notes: '3월 첫째주 급여'
            }
        ];
        
        localStorage.setItem('mock_employees', JSON.stringify(mockEmployees));
        localStorage.setItem('mock_payments', JSON.stringify(mockPayments));
        
        console.log('✅ Mock 데이터 초기화 완료');
    }
}

// ============================================
// 직원 데이터 로드
// ============================================
async function loadEmployees() {
    try {
        console.log('📥 직원 데이터 로드 시작...');
        
        // LocalStorage에서 데이터 로드
        const data = localStorage.getItem('mock_employees');
        employees = data ? JSON.parse(data) : [];
        
        console.log(`✅ 직원 ${employees.length}명 로드 완료`);
        
        // 부서 목록 업데이트
        updateDepartmentFilter();
        
        // 테이블 렌더링
        renderEmployees(employees);
        
        // 통계 업데이트
        updateStatistics();
        
    } catch (error) {
        console.error('❌ 직원 데이터 로드 실패:', error);
        employees = [];
        renderEmployees([]);
    }
}

// ============================================
// 급여 지급 내역 로드
// ============================================
async function loadPayments() {
    try {
        console.log('📥 급여 지급 내역 로드 시작...');
        
        // LocalStorage에서 데이터 로드
        const data = localStorage.getItem('mock_payments');
        payments = data ? JSON.parse(data) : [];
        
        console.log(`✅ 급여 내역 ${payments.length}건 로드 완료`);
        
        // 연도 필터 업데이트
        updateYearFilter();
        
        // 테이블 렌더링
        renderPayments(payments);
        
    } catch (error) {
        console.error('❌ 급여 내역 로드 실패:', error);
        payments = [];
        renderPayments([]);
    }
}

// ============================================
// 부서 필터 업데이트
// ============================================
function updateDepartmentFilter() {
    const departments = [...new Set(employees.map(emp => emp.department).filter(d => d))];
    const select = document.getElementById('filterDepartment');
    
    // 기존 옵션 유지하고 새 옵션 추가
    const currentOptions = Array.from(select.options).map(opt => opt.value);
    
    departments.forEach(dept => {
        if (!currentOptions.includes(dept)) {
            const option = document.createElement('option');
            option.value = dept;
            option.textContent = dept;
            select.appendChild(option);
        }
    });

    // 부서 datalist 업데이트
    const datalist = document.getElementById('departmentList');
    datalist.innerHTML = departments.map(dept => `<option value="${dept}">`).join('');
}

// ============================================
// 연도 필터 업데이트
// ============================================
function updateYearFilter() {
    const years = [...new Set(payments.map(pay => pay.payment_year).filter(y => y))];
    years.sort((a, b) => b - a);
    
    const select = document.getElementById('filterPaymentYear');
    select.innerHTML = '<option value="">전체 연도</option>';
    
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year + '년';
        select.appendChild(option);
    });
}

// ============================================
// 직원 목록 렌더링
// ============================================
function renderEmployees(data) {
    console.log('🎨 직원 목록 렌더링, 개수:', data.length);
    
    const tbody = document.getElementById('employeeTableBody');
    if (!tbody) {
        console.error('❌ employeeTableBody 요소를 찾을 수 없습니다');
        return;
    }
    
    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    <i class="fas fa-users"></i>
                    <h3>등록된 직원이 없습니다</h3>
                    <p>상단의 "직원 등록" 버튼을 클릭하여 새 직원을 등록하세요</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = data.map(employee => {
        // 사진 처리
        let avatar = '';
        if (employee.photo_url) {
            avatar = `<img src="${employee.photo_url}" class="employee-avatar" alt="${employee.name}">`;
        } else {
            const initials = employee.name ? employee.name.substring(0, 2) : '?';
            avatar = `<div class="employee-avatar-placeholder">${initials}</div>`;
        }

        // 시급/월급 표시
        let wage = '-';
        if (employee.employment_type === '일용직' && employee.hourly_rate) {
            wage = formatCurrency(employee.hourly_rate) + '/시간';
        } else if (employee.employment_type === '상용직' && employee.monthly_salary) {
            wage = formatCurrency(employee.monthly_salary) + '/월';
        }

        // 상태 배지
        const statusClass = employee.status === '재직' ? 'status-active' : 'status-inactive';
        const statusBadge = `<span class="status-badge ${statusClass}">${employee.status || '재직'}</span>`;
        
        return `
            <tr>
                <td>${avatar}</td>
                <td><strong>${employee.name || '-'}</strong></td>
                <td>${employee.department || '-'}</td>
                <td>${employee.employment_type || '-'}</td>
                <td>${employee.phone || '-'}</td>
                <td>${wage}</td>
                <td style="text-align: center;">${statusBadge}</td>
                <td style="text-align: center;">
                    <div class="action-buttons">
                        <button class="btn-confirm" onclick="openPayrollModal('${employee.id}')" title="급여 지급" ${employee.status !== '재직' ? 'disabled' : ''}>
                            <i class="fas fa-money-bill-wave"></i> 급여
                        </button>
                        <button class="btn-icon" onclick="openEmployeeModal('${employee.id}')" title="수정">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="deleteEmployee('${employee.id}')" title="삭제" style="color: #e74c3c;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ============================================
// 급여 지급 내역 렌더링
// ============================================
function renderPayments(data) {
    console.log('🎨 급여 지급 내역 렌더링, 개수:', data.length);
    
    const tbody = document.getElementById('paymentTableBody');
    if (!tbody) {
        console.error('❌ paymentTableBody 요소를 찾을 수 없습니다');
        return;
    }
    
    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="empty-state">
                    <i class="fas fa-file-invoice"></i>
                    <h3>급여 지급 내역이 없습니다</h3>
                    <p>직원 목록에서 "급여" 버튼을 클릭하여 급여를 지급하세요</p>
                </td>
            </tr>
        `;
        return;
    }

    // 최신순 정렬
    data.sort((a, b) => {
        const dateA = new Date(a.payment_date || 0);
        const dateB = new Date(b.payment_date || 0);
        return dateB - dateA;
    });
    
    tbody.innerHTML = data.map(payment => {
        const reportBadge = payment.is_reported === '신고' 
            ? '<span class="status-badge status-active">신고</span>' 
            : '<span class="status-badge status-inactive">미신고</span>';
        
        return `
            <tr>
                <td>${formatDate(payment.payment_date)}</td>
                <td><strong>${payment.employee_name || '-'}</strong></td>
                <td>${payment.employment_type || '-'}</td>
                <td>${payment.work_hours ? payment.work_hours + '시간' : '-'}</td>
                <td style="text-align: right;">${formatCurrency(payment.base_salary)}</td>
                <td style="text-align: right;">${formatCurrency(payment.deductions)}</td>
                <td style="text-align: right;"><strong>${formatCurrency(payment.net_pay)}</strong></td>
                <td style="text-align: center;">${reportBadge}</td>
                <td style="text-align: center;">
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="viewPaymentDetail('${payment.id}')" title="상세보기">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" onclick="editPayment('${payment.id}')" title="수정">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="deletePayment('${payment.id}')" title="삭제" style="color: #e74c3c;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ============================================
// 직원 검색/필터링
// ============================================
function filterEmployees() {
    const searchTerm = document.getElementById('searchEmployee').value.toLowerCase();
    const statusFilter = document.getElementById('filterStatus').value;
    const departmentFilter = document.getElementById('filterDepartment').value;
    const employmentTypeFilter = document.getElementById('filterEmploymentType').value;
    
    const filtered = employees.filter(emp => {
        const matchSearch = !searchTerm || 
            (emp.name && emp.name.toLowerCase().includes(searchTerm)) ||
            (emp.phone && emp.phone.includes(searchTerm));
        
        const matchStatus = !statusFilter || emp.status === statusFilter;
        const matchDepartment = !departmentFilter || emp.department === departmentFilter;
        const matchEmploymentType = !employmentTypeFilter || emp.employment_type === employmentTypeFilter;
        
        return matchSearch && matchStatus && matchDepartment && matchEmploymentType;
    });
    
    renderEmployees(filtered);
}

// ============================================
// 급여 내역 검색/필터링
// ============================================
function filterPayments() {
    const searchTerm = document.getElementById('searchPayment').value.toLowerCase();
    const yearFilter = document.getElementById('filterPaymentYear').value;
    const monthFilter = document.getElementById('filterPaymentMonth').value;
    
    const filtered = payments.filter(payment => {
        const matchSearch = !searchTerm || 
            (payment.employee_name && payment.employee_name.toLowerCase().includes(searchTerm));
        
        const matchYear = !yearFilter || payment.payment_year === parseInt(yearFilter);
        const matchMonth = !monthFilter || payment.payment_month === parseInt(monthFilter);
        
        return matchSearch && matchYear && matchMonth;
    });
    
    renderPayments(filtered);
}

// ============================================
// 탭 전환
// ============================================
window.switchTab = function(tab) {
    currentTab = tab;
    
    // 탭 버튼 활성화
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    // 탭 컨텐츠 표시
    document.getElementById('employeesTab').style.display = tab === 'employees' ? 'block' : 'none';
    document.getElementById('paymentsTab').style.display = tab === 'payments' ? 'block' : 'none';
}

// ============================================
// 통계 업데이트
// ============================================
function updateStatistics() {
    // 재직 중인 직원 수
    const totalEmployees = employees.filter(emp => emp.status === '재직').length;
    document.getElementById('totalEmployees').textContent = `${totalEmployees}명`;
    
    // 이번 달 총 지급액 계산
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    const monthlyPayments = payments.filter(pay => 
        pay.payment_year === currentYear && 
        pay.payment_month === currentMonth &&
        pay.net_pay
    );
    
    const totalPayment = monthlyPayments.reduce((sum, pay) => sum + (pay.net_pay || 0), 0);
    document.getElementById('totalPayment').textContent = formatCurrency(totalPayment);
    
    // 총 근무시간
    const totalHours = monthlyPayments.reduce((sum, pay) => sum + (pay.work_hours || 0), 0);
    document.getElementById('totalHours').textContent = totalHours.toFixed(1) + '시간';

    // 평균 시급/월급
    const dailyEmployees = employees.filter(emp => emp.employment_type === '일용직' && emp.hourly_rate);
    const monthlyEmployees = employees.filter(emp => emp.employment_type === '상용직' && emp.monthly_salary);
    
    let avgWageText = '-';
    if (dailyEmployees.length > 0 || monthlyEmployees.length > 0) {
        const avgDaily = dailyEmployees.length > 0 
            ? dailyEmployees.reduce((sum, emp) => sum + emp.hourly_rate, 0) / dailyEmployees.length 
            : 0;
        const avgMonthly = monthlyEmployees.length > 0 
            ? monthlyEmployees.reduce((sum, emp) => sum + emp.monthly_salary, 0) / monthlyEmployees.length 
            : 0;
        
        avgWageText = '';
        if (avgDaily > 0) avgWageText += `시급 ${formatCurrency(avgDaily)}`;
        if (avgMonthly > 0) {
            if (avgWageText) avgWageText += ' / ';
            avgWageText += `월급 ${formatCurrency(avgMonthly)}`;
        }
    }
    document.getElementById('averageWage').textContent = avgWageText;
}

// [나머지 함수들은 동일하게 유지... 파일이 너무 길어서 계속 작성하겠습니다]
// 직원별 급여 이력 로드
// ============================================
function loadEmployeePaymentHistory(employeeId) {
    const employeePayments = payments.filter(pay => pay.employee_id === employeeId);
    const historyContainer = document.getElementById('paymentHistory');
    
    if (employeePayments.length === 0) {
        historyContainer.innerHTML = '<p style="text-align: center; color: #95a5a6;">급여 지급 이력이 없습니다.</p>';
        return;
    }

    // 최신순 정렬
    employeePayments.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));
    
    historyContainer.innerHTML = employeePayments.map(payment => `
        <div class="payment-history-item">
            <div class="payment-history-header">
                <span class="payment-date-badge">
                    <i class="fas fa-calendar"></i> ${formatDate(payment.payment_date)}
                </span>
                <span class="payment-amount">${formatCurrency(payment.net_pay)}</span>
            </div>
            <div class="payment-details">
                <div class="payment-detail-item">
                    <div class="payment-detail-label">근무시간</div>
                    <div class="payment-detail-value">${payment.work_hours || 0}시간</div>
                </div>
                <div class="payment-detail-item">
                    <div class="payment-detail-label">기본급</div>
                    <div class="payment-detail-value">${formatCurrency(payment.base_salary)}</div>
                </div>
                <div class="payment-detail-item">
                    <div class="payment-detail-label">공제액</div>
                    <div class="payment-detail-value">${formatCurrency(payment.deductions)}</div>
                </div>
                <div class="payment-detail-item">
                    <div class="payment-detail-label">신고여부</div>
                    <div class="payment-detail-value">${payment.is_reported || '미신고'}</div>
                </div>
            </div>
            ${payment.notes ? `<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #f0f0f0; font-size: 13px; color: #7f8c8d;"><i class="fas fa-sticky-note"></i> ${payment.notes}</div>` : ''}
        </div>
    `).join('');
}

// ============================================
// 급여 지급 모달 열기
// ============================================
window.openPayrollModal = function(employeeId) {
    console.log('💰 급여 지급 모달 열기:', employeeId);
    
    const employee = employees.find(emp => String(emp.id) === String(employeeId));
    
    if (!employee) {
        alert('직원 정보를 찾을 수 없습니다.');
        return;
    }

    if (employee.status !== '재직') {
        alert('퇴직한 직원은 급여를 지급할 수 없습니다.');
        return;
    }
    
    // 모달 열기
    openEmployeeModal(employeeId);
    
    // 모달 타이틀 변경
    document.getElementById('modalTitle').textContent = `급여 지급 - ${employee.name}`;
    
    // 오늘 날짜로 지급일 설정
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('paymentDate').value = today;
    document.getElementById('paymentYear').value = new Date().getFullYear();
    document.getElementById('paymentMonth').value = new Date().getMonth() + 1;
    
    // 근무시간 입력 필드로 포커스
    setTimeout(() => {
        document.getElementById('workHours').focus();
        document.getElementById('workHours').select();
    }, 300);
};

// ============================================
// 급여 상세 보기
// ============================================
window.viewPaymentDetail = function(paymentId) {
    const payment = payments.find(pay => String(pay.id) === String(paymentId));
    if (!payment) {
        alert('급여 내역을 찾을 수 없습니다.');
        return;
    }

    const employee = employees.find(emp => String(emp.id) === String(payment.employee_id));
    if (employee) {
        openEmployeeModal(employee.id);
    } else {
        alert('직원 정보를 찾을 수 없습니다.');
    }
}

// ============================================
// 급여 내역 수정
// ============================================
window.editPayment = function(paymentId) {
    const payment = payments.find(pay => String(pay.id) === String(paymentId));
    if (!payment) {
        alert('급여 내역을 찾을 수 없습니다.');
        return;
    }

    const employee = employees.find(emp => String(emp.id) === String(payment.employee_id));
    if (!employee) {
        alert('직원 정보를 찾을 수 없습니다.');
        return;
    }

    // 직원 모달 열기
    openEmployeeModal(employee.id);
    
    // 급여 정보 입력
    document.getElementById('paymentDate').value = payment.payment_date || '';
    document.getElementById('paymentYear').value = payment.payment_year || '';
    document.getElementById('paymentMonth').value = payment.payment_month || '';
    document.getElementById('workHours').value = payment.work_hours || '';
    document.getElementById('businessAccountPay').value = payment.business_account_pay || '';
    document.getElementById('personalAccountPay').value = payment.personal_account_pay || '';
    document.getElementById('isReported').value = payment.is_reported || '미신고';
    document.getElementById('notes').value = payment.notes || '';

    // 급여 재계산
    calculatePayroll();
}

// ============================================
// 모달 닫기
// ============================================
window.closeEmployeeModal = function() {
    document.getElementById('employeeModal').style.display = 'none';
    document.getElementById('employeeForm').reset();
    currentPhotoFile = null;
}

// ============================================
// 시급/월급 필드 토글
// ============================================
window.toggleSalaryFields = function() {
    const employmentType = document.getElementById('employmentType').value;
    const hourlyRateGroup = document.getElementById('hourlyRateGroup');
    const monthlySalaryGroup = document.getElementById('monthlySalaryGroup');
    const hourlyRate = document.getElementById('hourlyRate');
    const monthlySalary = document.getElementById('monthlySalary');
    
    if (employmentType === '일용직') {
        // 일용직: 시급만 표시
        hourlyRateGroup.style.display = 'block';
        monthlySalaryGroup.style.display = 'none';
        hourlyRate.required = true;
        monthlySalary.required = false;
        monthlySalary.value = '';
    } else if (employmentType === '상용직') {
        // 상용직: 월급만 표시
        hourlyRateGroup.style.display = 'none';
        monthlySalaryGroup.style.display = 'block';
        hourlyRate.required = false;
        monthlySalary.required = true;
        hourlyRate.value = '';
    } else {
        // 선택 안 됨: 둘 다 숨김
        hourlyRateGroup.style.display = 'none';
        monthlySalaryGroup.style.display = 'none';
        hourlyRate.required = false;
        monthlySalary.required = false;
    }
    
    // 급여 재계산
    calculatePayroll();
}

// ============================================
// 사진 업로드 처리
// ============================================
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return;
    }

    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        currentPhotoFile = e.target.result;
        document.getElementById('photoUrl').value = e.target.result;
        document.getElementById('photoPreview').innerHTML = `<img src="${e.target.result}" alt="직원 사진">`;
        console.log('✅ 사진 업로드 완료');
    };
    reader.readAsDataURL(file);
}

// ============================================
// 사진 삭제
// ============================================
window.deletePhoto = function() {
    if (!confirm('사진을 삭제하시겠습니까?')) return;
    
    currentPhotoFile = null;
    document.getElementById('photoUrl').value = '';
    document.getElementById('photoPreview').innerHTML = '<i class="fas fa-user"></i>';
    document.getElementById('photoInput').value = '';
    console.log('🗑️ 사진 삭제 완료');
}

// ============================================
// 급여 자동 계산
// ============================================
window.calculatePayroll = function() {
    const employmentType = document.getElementById('employmentType').value;
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value) || 0;
    const monthlySalary = parseFloat(document.getElementById('monthlySalary').value) || 0;
    const workHours = parseFloat(document.getElementById('workHours').value) || 0;
    
    let baseSalary = 0;
    let deductions = 0;
    let deductionDetails = {};
    
    // 1. 기본급 계산
    if (employmentType === '일용직') {
        baseSalary = hourlyRate * workHours;
    } else if (employmentType === '상용직') {
        baseSalary = monthlySalary;
    }
    
    // 2. 공제액 계산
    if (employmentType === '일용직') {
        // 일용직: 고용보험 0.9%
        const employmentInsurance = Math.round(baseSalary * 0.009);
        deductions = employmentInsurance;
        deductionDetails = {
            employmentInsurance: employmentInsurance
        };
    } else if (employmentType === '상용직') {
        // 상용직: 국민연금 4.5%, 건강보험 3.545%, 장기요양 (건강보험 * 12.95%), 고용보험 0.9%
        const nationalPension = Math.round(baseSalary * 0.045);
        const healthInsurance = Math.round(baseSalary * 0.03545);
        const longTermCare = Math.round(healthInsurance * 0.1295);
        const employmentInsurance = Math.round(baseSalary * 0.009);
        
        deductions = nationalPension + healthInsurance + longTermCare + employmentInsurance;
        deductionDetails = {
            nationalPension: nationalPension,
            healthInsurance: healthInsurance,
            longTermCare: longTermCare,
            employmentInsurance: employmentInsurance
        };
    }
    
    // 3. 최종 지급액
    const netPay = baseSalary - deductions;
    
    // 4. 사업용/개인용 계좌 자동 분배 (기준 금액: 713,520원)
    const businessThreshold = 713520;
    let businessAccountPay = 0;
    let personalAccountPay = 0;
    
    if (netPay <= businessThreshold) {
        businessAccountPay = netPay;
        personalAccountPay = 0;
    } else {
        businessAccountPay = businessThreshold;
        personalAccountPay = netPay - businessThreshold;
    }
    
    // 5. 값 설정
    document.getElementById('baseSalary').value = Math.round(baseSalary);
    document.getElementById('deductions').value = Math.round(deductions);
    document.getElementById('netPay').value = Math.round(netPay);
    document.getElementById('businessAccountPay').value = Math.round(businessAccountPay);
    document.getElementById('personalAccountPay').value = Math.round(personalAccountPay);

    // 6. 공제액 상세 내역 표시
    if (baseSalary > 0) {
        displayDeductionBreakdown(employmentType, deductionDetails);
    } else {
        document.getElementById('deductionBreakdown').style.display = 'none';
    }
    
    console.log('💰 급여 계산 완료:', {
        baseSalary: baseSalary,
        deductions: deductions,
        netPay: netPay,
        businessAccountPay: businessAccountPay,
        personalAccountPay: personalAccountPay,
        details: deductionDetails
    });
}

// ============================================
// 공제액 상세 내역 표시
// ============================================
function displayDeductionBreakdown(employmentType, details) {
    const breakdownDiv = document.getElementById('deductionBreakdown');
    const tbody = document.getElementById('deductionBreakdownBody');
    
    let html = '';
    
    if (employmentType === '일용직') {
        html += `
            <tr>
                <td>고용보험</td>
                <td>0.9%</td>
                <td style="text-align: right;">${formatCurrency(details.employmentInsurance || 0)}</td>
            </tr>
            <tr style="font-weight: bold; background: #f8f9ff;">
                <td colspan="2">합계</td>
                <td style="text-align: right;">${formatCurrency(details.employmentInsurance || 0)}</td>
            </tr>
        `;
    } else if (employmentType === '상용직') {
        const total = (details.nationalPension || 0) + (details.healthInsurance || 0) + 
                     (details.longTermCare || 0) + (details.employmentInsurance || 0);
        
        html += `
            <tr>
                <td>국민연금</td>
                <td>4.5%</td>
                <td style="text-align: right;">${formatCurrency(details.nationalPension || 0)}</td>
            </tr>
            <tr>
                <td>건강보험</td>
                <td>3.545%</td>
                <td style="text-align: right;">${formatCurrency(details.healthInsurance || 0)}</td>
            </tr>
            <tr>
                <td>장기요양보험</td>
                <td>건강보험 × 12.95%</td>
                <td style="text-align: right;">${formatCurrency(details.longTermCare || 0)}</td>
            </tr>
            <tr>
                <td>고용보험</td>
                <td>0.9%</td>
                <td style="text-align: right;">${formatCurrency(details.employmentInsurance || 0)}</td>
            </tr>
            <tr style="font-weight: bold; background: #f8f9ff;">
                <td colspan="2">합계</td>
                <td style="text-align: right;">${formatCurrency(total)}</td>
            </tr>
        `;
    }
    
    tbody.innerHTML = html;
    breakdownDiv.style.display = 'block';
}

// ============================================
// 직원 저장 (Mock 버전 - LocalStorage 사용)
// ============================================
window.saveEmployee = async function() {
    console.log('💾 직원 정보 저장 시작...');
    
    // 필수 필드 검증
    const name = document.getElementById('employeeName').value.trim();
    const department = document.getElementById('employeeDepartment').value.trim();
    const phone = document.getElementById('employeePhone').value.trim();
    const employmentType = document.getElementById('employmentType').value;
    const hireDate = document.getElementById('hireDate').value;
    const status = document.getElementById('employeeStatus').value;
    
    if (!name || !department || !phone || !employmentType || !hireDate) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
    }

    // 전화번호 형식 검증
    const phonePattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phonePattern.test(phone)) {
        alert('연락처는 000-0000-0000 형식으로 입력해주세요.');
        document.getElementById('employeePhone').focus();
        return;
    }
    
    // 시급/월급 검증
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value) || 0;
    const monthlySalary = parseFloat(document.getElementById('monthlySalary').value) || 0;
    
    if (employmentType === '일용직' && hourlyRate <= 0) {
        alert('일용직은 시급을 입력해야 합니다.');
        document.getElementById('hourlyRate').focus();
        return;
    }
    
    if (employmentType === '상용직' && monthlySalary <= 0) {
        alert('상용직은 월급을 입력해야 합니다.');
        document.getElementById('monthlySalary').focus();
        return;
    }

    // 직원 데이터 객체 생성
    const employeeData = {
        name: name,
        department: department,
        phone: phone,
        employment_type: employmentType,
        hourly_rate: hourlyRate,
        monthly_salary: monthlySalary,
        bank_account: document.getElementById('bankAccount').value.trim(),
        hire_date: hireDate,
        resign_date: document.getElementById('resignDate').value || null,
        status: status,
        photo_url: document.getElementById('photoUrl').value || null
    };

    // 급여 정보가 입력되었는지 확인
    const paymentDate = document.getElementById('paymentDate').value;
    const workHours = parseFloat(document.getElementById('workHours').value) || 0;
    const baseSalary = parseFloat(document.getElementById('baseSalary').value) || 0;
    
    const hasPaymentInfo = paymentDate && (workHours > 0 || baseSalary > 0);
    
    try {
        const employeeId = document.getElementById('employeeId').value;
        let savedEmployeeId = employeeId;
        
        if (employeeId) {
            // 직원 정보 수정
            console.log('📝 직원 정보 수정:', employeeId);
            const index = employees.findIndex(emp => emp.id === employeeId);
            if (index !== -1) {
                employees[index] = { ...employees[index], ...employeeData };
            }
        } else {
            // 새 직원 등록
            console.log('➕ 새 직원 등록');
            savedEmployeeId = 'emp-' + Date.now();
            employeeData.id = savedEmployeeId;
            employees.push(employeeData);
        }

        // LocalStorage에 저장
        localStorage.setItem('mock_employees', JSON.stringify(employees));

        // 급여 정보가 있으면 급여 테이블에 저장
        if (hasPaymentInfo) {
            const paymentData = {
                id: 'pay-' + Date.now(),
                employee_id: savedEmployeeId,
                employee_name: name,
                employment_type: employmentType,
                payment_date: paymentDate,
                payment_year: parseInt(document.getElementById('paymentYear').value) || null,
                payment_month: parseInt(document.getElementById('paymentMonth').value) || null,
                work_hours: workHours,
                hourly_rate: hourlyRate,
                monthly_salary: monthlySalary,
                base_salary: baseSalary,
                deductions: parseFloat(document.getElementById('deductions').value) || 0,
                net_pay: parseFloat(document.getElementById('netPay').value) || 0,
                business_account_pay: parseFloat(document.getElementById('businessAccountPay').value) || 0,
                personal_account_pay: parseFloat(document.getElementById('personalAccountPay').value) || 0,
                is_reported: document.getElementById('isReported').value || '미신고',
                notes: document.getElementById('notes').value.trim()
            };

            // 공제액 상세 정보 추가
            if (employmentType === '상용직') {
                const baseSalaryVal = baseSalary;
                paymentData.national_pension = Math.round(baseSalaryVal * 0.045);
                paymentData.health_insurance = Math.round(baseSalaryVal * 0.03545);
                paymentData.long_term_care = Math.round(paymentData.health_insurance * 0.1295);
                paymentData.employment_insurance = Math.round(baseSalaryVal * 0.009);
            } else {
                paymentData.employment_insurance = Math.round(baseSalary * 0.009);
            }

            console.log('💰 급여 정보 저장:', paymentData);
            payments.push(paymentData);
            localStorage.setItem('mock_payments', JSON.stringify(payments));
            
            showSuccess(employeeId ? '직원 정보와 급여가 저장되었습니다!' : '새 직원과 급여가 등록되었습니다!');
        } else {
            showSuccess(employeeId ? '직원 정보가 수정되었습니다!' : '새 직원이 등록되었습니다!');
        }
        
        // 모달 닫기 & 데이터 다시 로드
        closeEmployeeModal();
        await loadEmployees();
        await loadPayments();
        
    } catch (error) {
        console.error('❌ 저장 실패:', error);
        alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
}

// ============================================
// 직원 삭제 (Mock 버전 - LocalStorage 사용)
// ============================================
window.deleteEmployee = async function(employeeId) {
    const employee = employees.find(emp => String(emp.id) === String(employeeId));
    if (!employee) {
        alert('직원 정보를 찾을 수 없습니다.');
        return;
    }

    if (!confirm(`${employee.name} 직원을 정말 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없으며, 관련된 급여 내역도 모두 삭제됩니다.`)) {
        return;
    }
    
    try {
        console.log('🗑️ 직원 삭제:', employeeId);
        
        // 직원 삭제
        employees = employees.filter(emp => String(emp.id) !== String(employeeId));
        localStorage.setItem('mock_employees', JSON.stringify(employees));
        
        // 관련 급여 내역 삭제
        payments = payments.filter(pay => String(pay.employee_id) !== String(employeeId));
        localStorage.setItem('mock_payments', JSON.stringify(payments));
        
        showSuccess('직원이 삭제되었습니다.');
        await loadEmployees();
        await loadPayments();
        
    } catch (error) {
        console.error('❌ 삭제 실패:', error);
        alert('삭제에 실패했습니다.');
    }
}

// ============================================
// 급여 내역 삭제 (Mock 버전 - LocalStorage 사용)
// ============================================
window.deletePayment = async function(paymentId) {
    if (!confirm('이 급여 내역을 정말 삭제하시겠습니까?')) {
        return;
    }
    
    try {
        console.log('🗑️ 급여 내역 삭제:', paymentId);
        
        payments = payments.filter(pay => String(pay.id) !== String(paymentId));
        localStorage.setItem('mock_payments', JSON.stringify(payments));
        
        showSuccess('급여 내역이 삭제되었습니다.');
        await loadPayments();
        updateStatistics();
        
    } catch (error) {
        console.error('❌ 삭제 실패:', error);
        alert('삭제에 실패했습니다.');
    }
}

// ============================================
// 엑셀 내보내기
// ============================================
window.exportToExcel = function() {
    if (currentTab === 'employees') {
        exportEmployeesToExcel();
    } else {
        exportPaymentsToExcel();
    }
}

function exportEmployeesToExcel() {
    if (employees.length === 0) {
        alert('내보낼 데이터가 없습니다.');
        return;
    }

    const headers = ['이름', '부서', '고용형태', '연락처', '시급', '월급', '입사일', '퇴사일', '상태', '계좌번호'];
    const data = employees.map(emp => [
        emp.name || '',
        emp.department || '',
        emp.employment_type || '',
        emp.phone || '',
        emp.hourly_rate || '',
        emp.monthly_salary || '',
        emp.hire_date || '',
        emp.resign_date || '',
        emp.status || '',
        emp.bank_account || ''
    ]);

    const csvContent = convertArrayToCSV([headers, ...data]);
    downloadCSVFile(csvContent, `직원목록_${formatDate(new Date())}.csv`);
    console.log('✅ 직원 목록 엑셀 내보내기 완료');
}

function exportPaymentsToExcel() {
    if (payments.length === 0) {
        alert('내보낼 데이터가 없습니다.');
        return;
    }

    const headers = ['지급일', '직원명', '고용형태', '근무시간', '시급/월급', '기본급', '공제액', '지급액', '사업용계좌', '개인용계좌', '신고여부', '비고'];
    const data = payments.map(pay => [
        formatDate(pay.payment_date) || '',
        pay.employee_name || '',
        pay.employment_type || '',
        pay.work_hours || '',
        pay.employment_type === '일용직' ? pay.hourly_rate : pay.monthly_salary,
        pay.base_salary || '',
        pay.deductions || '',
        pay.net_pay || '',
        pay.business_account_pay || '',
        pay.personal_account_pay || '',
        pay.is_reported || '',
        pay.notes || ''
    ]);

    const csvContent = convertArrayToCSV([headers, ...data]);
    downloadCSVFile(csvContent, `급여지급내역_${formatDate(new Date())}.csv`);
    console.log('✅ 급여 지급 내역 엑셀 내보내기 완료');
}

function convertArrayToCSV(data) {
    return data.map(row => 
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
}

function downloadCSVFile(content, filename) {
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ============================================
// 모달 외부 클릭 시 닫기
// ============================================
window.onclick = function(event) {
    const modal = document.getElementById('employeeModal');
    if (event.target === modal) {
        if (confirm('작성 중인 내용이 저장되지 않을 수 있습니다. 닫으시겠습니까?')) {
            closeEmployeeModal();
        }
    }
};

// ============================================
// 키보드 단축키
// ============================================
document.addEventListener('keydown', function(e) {
    // Esc 키로 모달 닫기
    if (e.key === 'Escape') {
        const modal = document.getElementById('employeeModal');
        if (modal.style.display === 'block') {
            if (confirm('작성 중인 내용이 저장되지 않을 수 있습니다. 닫으시겠습니까?')) {
                closeEmployeeModal();
            }
        }
    }
    
    // Ctrl + S로 저장
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        const modal = document.getElementById('employeeModal');
        if (modal.style.display === 'block') {
            saveEmployee();
        }
    }
});
