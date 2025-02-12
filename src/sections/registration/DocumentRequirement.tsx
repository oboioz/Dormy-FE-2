import { m } from 'framer-motion';
// @mui
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function DocumentRequirement() {

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';


  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
          Required Documents
        </Typography>
      </m.div>

      <Typography variant="h5">
        Để đảm bảo thời gian đăng ký ở Ký túc xá trực tuyến, sinh viên chuẩn bị đầy đủ file hình sau:
      </Typography>

      <Typography variant="body2">
        Thẻ căn cước công dân/mã số định danh cá nhân;
        Thẻ Bảo hiểm Y tế;
        Giấy tờ minh chứng sinh viên:
      </Typography>
      <Box>
        <Typography variant="h6">
          a. Đối với tân sinh viên:
        </Typography>
        <Typography variant="body2">
          - Làm thủ tục nhập học ở trường trước khi đăng ký ở Ký túc xá;
        </Typography>
        <Typography variant="body2">
          - Sinh viên các trường thuộc ĐHQG-HCM: Thẻ sinh viên/Giấy biên nhận hồ sơ nhập học/Giấy xác nhận đã nhập học;
        </Typography>
        <Typography variant="body2">
          - Sinh viên các trường ngoài ĐHQG-HCM: Giấy xác nhận có đóng dấu của nhà trường;
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6">
          b. Đối với sinh viên năm 2 trở lên:
        </Typography>
        <Typography variant="body2">
          - Sinh viên các trường thuộc ĐHQG-HCM: Thẻ sinh viên/Giấy xác nhận sinh viên/Thời khoá biểu học tập;
        </Typography>
        <Typography variant="body2">
          - Sinh viên các trường ngoài ĐHQG-HCM: Giấy xác nhận có đóng dấu của nhà trường;
        </Typography>
      </Box>

      <m.div variants={varFade().inUp}>
        <Typography variant="h6">Lưu ý:</Typography>
        <Typography variant="body2">
          - Ảnh mới chụp: không quá 6 tháng;
        </Typography>
        <Typography variant="body2">
          - Tỉ lệ ảnh: 4 x 6.
        </Typography>
        <Typography variant="body2">
          - Tỉ lệ diện tích khuôn mặt: chiếm khoảng 75% diện tích ảnh;
        </Typography>
        <Typography variant="body2">
          - Chiều cao từ mắt lên mép trên của ảnh: xấp xỉ 2/3 chiều cao từ mắt xuống mép dưới của ảnh.
        </Typography>
        <Typography variant="body2">
          - Góc chụp: Mặt nhìn thẳng.
        </Typography>
        <Typography variant="body2">
          - Trang phục: Đầu để trần, không đeo kính, trang phục gọn gàng lịch sự.
        </Typography>
        <Typography variant="body2">
          - Phông nền: màu trắng hoặc màu xanh.
        </Typography>
        <Typography variant="body2">
          - Định dạng file: .jpeg, .png (File ảnh từ điện thoại hoặc từ các thiết bị chụp ảnh kĩ thuật số, Không được chụp lại ảnh thẻ 3x4 hoặc 4x6)
        </Typography>
        <Typography variant="body2">
          - Ảnh gốc: Ảnh được chụp từ điện thoại, không qua các ứng dụng chỉnh sửa ảnh.
        </Typography>
        <Typography variant="body2">
          - Vì ảnh sẽ được sử dụng cho công tác in thẻ và hệ thống nhận diện khuôn mặt (FaceId) tại ký túc xá. Sinh viên sẽ phải hoàn toàn chịu trách nhiệm về việc đăng tải hình ảnh chân dung nếu có sai sót xảy ra.
        </Typography>
      </m.div>
    </Stack>
  );
}
