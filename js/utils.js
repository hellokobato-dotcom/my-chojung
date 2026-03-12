// ============================================
// 유틸리티 함수 모음 v2.0.0
// ============================================

// ============================================
// 숫자 포맷팅
// ============================================

// 숫자를 한국 원화 형식으로 포맷
function formatCurrency(amount) {
    if (amount === null || amount === undefined || amount === '') return '0원';
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(num)) return '0원';
    
    return new Intl.NumberFormat('ko-KR', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num) + '원';
}

// 숫자를 천 단위 구분 형식으로 포맷
function formatNumber(num) {
    if (num === null || num === undefined || num === '') return '0';
    const number = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(number)) return '0';
    
    return new Intl.NumberFormat('ko-KR').format(number);
}

// 퍼센트 포맷
function formatPercent(value, decimals = 1) {
    if (value === null || value === undefined) return '0%';
    return value.toFixed(decimals) + '%';
}

// ============================================
// 날짜 포맷팅
// ============================================

// 날짜를 한국 형식으로 포맷 (YYYY-MM-DD)
function formatDate(date) {
    if (!date) return '';
    
    let d;
    if (typeof date === 'string') {
        d = new Date(date);
    } else if (date instanceof Date) {
        d = date;
    } else {
        return '';
    }
    
    if (isNaN(d.getTime())) return '';
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// 날짜를 상세 형식으로 포맷 (YYYY-MM-DD HH:mm)
function formatDateTime(date) {
    if (!date) return '';
    
    let d;
    if (typeof date === 'string') {
        d = new Date(date);
    } else if (date instanceof Date) {
        d = date;
    } else {
        return '';
    }
    
    if (isNaN(d.getTime())) return '';
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 날짜를 한글 형식으로 포맷 (YYYY년 MM월 DD일)
function formatDateKorean(date) {
    if (!date) return '';
    
    let d;
    if (typeof date === 'string') {
        d = new Date(date);
    } else if (date instanceof Date) {
        d = date;
    } else {
        return '';
    }
    
    if (isNaN(d.getTime())) return '';
    
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    
    return `${year}년 ${month}월 ${day}일`;
}

// 상대적 시간 표시 (예: 2시간 전, 3일 전)
function formatRelativeTime(date) {
    if (!date) return '';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const now = new Date();
    const diff = now - d;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) return `${years}년 전`;
    if (months > 0) return `${months}개월 전`;
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return '방금 전';
}

// ============================================
// 계산 유틸리티
// ============================================

// 퍼센트 변화율 계산
function calculatePercentChange(current, previous) {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
}

// 평균 계산
function calculateAverage(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    return sum / numbers.length;
}

// 합계 계산
function calculateSum(numbers) {
    if (!Array.isArray(numbers)) return 0;
    return numbers.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
}

// ============================================
// UUID 생성
// ============================================
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// ============================================
// 날짜 유틸리티
// ============================================

// 현재 년도 가져오기
function getCurrentYear() {
    return new Date().getFullYear();
}

// 현재 월 가져오기 (1-12)
function getCurrentMonth() {
    return new Date().getMonth() + 1;
}

// 현재 날짜 가져오기 (YYYY-MM-DD)
function getTodayDate() {
    return formatDate(new Date());
}

// 월 배열 생성
function generateMonthsArray(year) {
    return Array.from({ length: 12 }, (_, i) => ({
        year: year,
        month: i + 1,
        label: `${i + 1}월`
    }));
}

// 날짜 범위 유효성 검사
function isValidDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= end;
}

// ============================================
// API 호출 헬퍼 함수
// ============================================

// 테이블 데이터 조회
async function fetchTableData(tableName, params = {}) {
    try {
        const queryParams = new URLSearchParams(params);
        const url = `tables/${tableName}?${queryParams}`;
        console.log(`📡 API 호출: ${url}`);
        
        const response = await fetch(url);
        console.log(`📨 응답 상태: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ HTTP 에러 응답:`, errorText);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        const data = await response.json();
        console.log(`✅ 데이터 로드 성공:`, data);
        return data;
    } catch (error) {
        console.error(`❌ Error fetching ${tableName}:`, error);
        throw error;
    }
}

// 레코드 생성
async function createRecord(tableName, data) {
    try {
        console.log(`➕ 레코드 생성: ${tableName}`, data);
        
        const response = await fetch(`tables/${tableName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        const result = await response.json();
        console.log(`✅ 레코드 생성 완료:`, result);
        return result;
    } catch (error) {
        console.error(`❌ Error creating record in ${tableName}:`, error);
        throw error;
    }
}

// 레코드 업데이트
async function updateRecord(tableName, recordId, data) {
    try {
        console.log(`✏️ 레코드 업데이트: ${tableName}/${recordId}`, data);
        
        const response = await fetch(`tables/${tableName}/${recordId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        const result = await response.json();
        console.log(`✅ 레코드 업데이트 완료:`, result);
        return result;
    } catch (error) {
        console.error(`❌ Error updating record in ${tableName}:`, error);
        throw error;
    }
}

// 레코드 삭제
async function deleteRecord(tableName, recordId) {
    try {
        console.log(`🗑️ 레코드 삭제: ${tableName}/${recordId}`);
        
        const response = await fetch(`tables/${tableName}/${recordId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok && response.status !== 204) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        console.log(`✅ 레코드 삭제 완료`);
        return true;
    } catch (error) {
        console.error(`❌ Error deleting record in ${tableName}:`, error);
        throw error;
    }
}

// ============================================
// 데이터 처리 유틸리티
// ============================================

// 테이블 데이터 필터링 (년/월)
function filterDataByPeriod(data, year, month) {
    return data.filter(item => {
        const matchYear = !year || item.year === parseInt(year);
        const matchMonth = !month || item.month === parseInt(month);
        return matchYear && matchMonth;
    });
}

// 데이터 그룹핑 (월별)
function groupByMonth(data) {
    const grouped = {};
    
    data.forEach(item => {
        const key = `${item.year}-${String(item.month).padStart(2, '0')}`;
        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(item);
    });
    
    return grouped;
}

// 합계 계산 (특정 필드)
function sumByField(data, fieldName) {
    return data.reduce((sum, item) => sum + (parseFloat(item[fieldName]) || 0), 0);
}

// 카테고리별 합계
function sumByCategory(data, categoryField, amountField) {
    const result = {};
    
    data.forEach(item => {
        const category = item[categoryField] || '기타';
        const amount = parseFloat(item[amountField]) || 0;
        
        if (!result[category]) {
            result[category] = 0;
        }
        result[category] += amount;
    });
    
    return result;
}

// ============================================
// 유효성 검증
// ============================================

// 빈 값 체크
function isEmpty(value) {
    return value === null || value === undefined || value === '' || 
           (Array.isArray(value) && value.length === 0) ||
           (typeof value === 'object' && Object.keys(value).length === 0);
}

// 이메일 유효성 검사
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// 전화번호 유효성 검사 (한국)
function isValidPhone(phone) {
    const phonePattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    return phonePattern.test(phone);
}

// 숫자 유효성 검사
function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

// ============================================
// 로컬 스토리지 헬퍼
// ============================================
const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('❌ Error saving to localStorage:', e);
            return false;
        }
    },
    
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('❌ Error reading from localStorage:', e);
            return defaultValue;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('❌ Error removing from localStorage:', e);
            return false;
        }
    },

    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('❌ Error clearing localStorage:', e);
            return false;
        }
    }
};

// ============================================
// UI 유틸리티
// ============================================

// 로딩 표시
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #95a5a6;">
                <div class="loading-spinner" style="margin: 0 auto 1rem;"></div>
                <p>로딩 중...</p>
            </div>
        `;
    }
}

// 에러 메시지 표시
function showError(message, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #e74c3c;">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>오류 발생</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// 성공 메시지 표시
function showSuccess(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// ============================================
// 디바운스 함수
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// 테이블 스키마 업데이트
// ============================================
async function updateTableSchema(tableName, fields) {
    try {
        console.log(`📋 테이블 스키마 확인: ${tableName}`);
        // RESTful Table API는 자동으로 스키마를 생성하므로
        // 실제로 API 호출은 필요 없지만, 로그를 남깁니다.
        console.log(`✅ 테이블 ${tableName} 스키마 준비 완료`);
        return true;
    } catch (error) {
        console.error(`❌ 테이블 스키마 업데이트 실패: ${tableName}`, error);
        throw error;
    }
}

// ============================================
// 배열 유틸리티
// ============================================

// 배열에서 중복 제거
function uniqueArray(arr) {
    return [...new Set(arr)];
}

// 배열 정렬 (숫자)
function sortByNumber(arr, key, descending = false) {
    return arr.sort((a, b) => {
        const aVal = parseFloat(a[key]) || 0;
        const bVal = parseFloat(b[key]) || 0;
        return descending ? bVal - aVal : aVal - bVal;
    });
}

// 배열 정렬 (문자열)
function sortByString(arr, key, descending = false) {
    return arr.sort((a, b) => {
        const aVal = String(a[key] || '');
        const bVal = String(b[key] || '');
        return descending ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
    });
}

// 배열 정렬 (날짜)
function sortByDate(arr, key, descending = false) {
    return arr.sort((a, b) => {
        const aDate = new Date(a[key] || 0);
        const bDate = new Date(b[key] || 0);
        return descending ? bDate - aDate : aDate - bDate;
    });
}

// ============================================
// 문자열 유틸리티
// ============================================

// 문자열 자르기 (말줄임표)
function truncateString(str, maxLength) {
    if (!str || str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
}

// 전화번호 포맷팅
function formatPhoneNumber(phone) {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (cleaned.length === 11) {
        return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    
    return phone;
}

// 사업자등록번호 포맷팅
function formatBusinessNumber(number) {
    if (!number) return '';
    const cleaned = number.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
    }
    
    return number;
}

// ============================================
// 차트 색상 팔레트
// ============================================
const chartColors = {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#27ae60',
    danger: '#e74c3c',
    warning: '#f39c12',
    info: '#3498db',
    purple: '#9b59b6',
    pink: '#e91e63',
    teal: '#1abc9c',
    orange: '#e67e22'
};

const chartBackgroundColors = {
    primary: 'rgba(102, 126, 234, 0.1)',
    secondary: 'rgba(118, 75, 162, 0.1)',
    success: 'rgba(39, 174, 96, 0.1)',
    danger: 'rgba(231, 76, 60, 0.1)',
    warning: 'rgba(243, 156, 18, 0.1)',
    info: 'rgba(52, 152, 219, 0.1)',
    purple: 'rgba(155, 89, 182, 0.1)',
    pink: 'rgba(233, 30, 99, 0.1)',
    teal: 'rgba(26, 188, 156, 0.1)',
    orange: 'rgba(230, 126, 34, 0.1)'
};

// ============================================
// 콘솔 로그 유틸리티
// ============================================

// 개발 모드 체크
const isDevelopment = () => {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname.includes('dev');
};

// 커스텀 로그 함수
const log = {
    info: (...args) => {
        if (isDevelopment()) {
            console.log('ℹ️', ...args);
        }
    },
    success: (...args) => {
        if (isDevelopment()) {
            console.log('✅', ...args);
        }
    },
    warning: (...args) => {
        if (isDevelopment()) {
            console.warn('⚠️', ...args);
        }
    },
    error: (...args) => {
        console.error('❌', ...args);
    }
};

// ============================================
// 브라우저 감지
// ============================================
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    
    if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
    else if (ua.indexOf('Safari') > -1) browser = 'Safari';
    else if (ua.indexOf('Edge') > -1) browser = 'Edge';
    else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) browser = 'IE';
    
    return {
        browser: browser,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
    };
}

// ============================================
// 파일 크기 포맷팅
// ============================================
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ============================================
// 클립보드 복사
// ============================================
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showSuccess('클립보드에 복사되었습니다');
        return true;
    } catch (err) {
        console.error('❌ 클립보드 복사 실패:', err);
        return false;
    }
}

// ============================================
// Export
// ============================================
// 브라우저 환경에서 전역으로 사용 가능하도록 설정
if (typeof window !== 'undefined') {
    window.utils = {
        formatCurrency,
        formatNumber,
        formatPercent,
        formatDate,
        formatDateTime,
        formatDateKorean,
        formatRelativeTime,
        calculatePercentChange,
        calculateAverage,
        calculateSum,
        generateUUID,
        getCurrentYear,
        getCurrentMonth,
        getTodayDate,
        generateMonthsArray,
        isValidDateRange,
        fetchTableData,
        createRecord,
        updateRecord,
        deleteRecord,
        filterDataByPeriod,
        groupByMonth,
        sumByField,
        sumByCategory,
        isEmpty,
        isValidEmail,
        isValidPhone,
        isValidNumber,
        storage,
        showLoading,
        showError,
        showSuccess,
        debounce,
        updateTableSchema,
        uniqueArray,
        sortByNumber,
        sortByString,
        sortByDate,
        truncateString,
        formatPhoneNumber,
        formatBusinessNumber,
        chartColors,
        chartBackgroundColors,
        log,
        getBrowserInfo,
        formatFileSize,
        copyToClipboard
    };
}
