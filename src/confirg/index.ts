//  các hàm dùng chung ở mọi component
// phần trang , forrmat ngày tháng, tiền tệ 

// firebase 
 

export const formatVND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});


export const formatDate = (date: string): string => {
  // Chia ngày tháng năm
  let [year, month, day] = date.split("-");
  // Đổi định dạng từ yyyy-MM-dd sang dd/mm/yyyy
  return `${day}/${month}/${year}`;
};
