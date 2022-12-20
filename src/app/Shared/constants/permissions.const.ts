export namespace Permissions {
	/**
	* Không giới hạn nội dung
	*/
	export const PermissionsAccessAll = 'aa';
	/**
	* Giới hạn nội dung
	*/
	export const PermissionsAccessGranted = 'ag';
	/**
	* Quản lý người dùng
	*/
	export const PermissionsUserManagement = 'um';
	/**
	* Quản lý khu vực
	*/
	export const AreasBase = '10';
	/**
	* Thêm khu vực
	*/
	export const AreasCreate = '1010';
	/**
	* Cập nhật khu vực
	*/
	export const AreasUpdate = '1020';
	/**
	* Xóa khu vực
	*/
	export const AreasDelete = '1030';
	/**
	* Lấy danh sách khu vực
	*/
	export const AreasReadMany = '1040';
	/**
	* Lấy thông tin 1 khu vực
	*/
	export const AreasReadOne = '1050';
	/**
	* Quản lý ban đại lễ
	*/
	export const DepartmentDetailBase = '20';
	/**
	* Thêm ban đại lễ
	*/
	export const DepartmentDetailCreate = '2010';
	/**
	* Cập nhật ban đại lễ
	*/
	export const DepartmentDetailUpdate = '2020';
	/**
	* Xóa ban đại lễ
	*/
	export const DepartmentDetailDelete = '2030';
	/**
	* Lấy danh sách ban đại lễ
	*/
	export const DepartmentDetailReadMany = '2040';
	/**
	* Lấy thông tin 1 ban đại lễ
	*/
	export const DepartmentDetailReadOne = '2050';
	/**
	* Duyệt ban đại lễ
	*/
	export const DepartmentDetailAccept = '2060';
	/**
	* Quản lý đăng ký
	*/
	export const EventRegistiesBase = '30';
	/**
	* Cập nhật đăng ký
	*/
	export const EventRegistiesUpdate = '3010';
	/**
	* Xóa đăng ký
	*/
	export const EventRegistiesDelete = '3020';
	/**
	* Lấy danh sách đăng ký
	*/
	export const EventRegistiesReadMany = '3030';
	/**
	* Lấy thông tin 1 đăng ký
	*/
	export const EventRegistiesReadOne = '3040';
	/**
	* Nhập đăng ký từ tệp
	*/
	export const EventRegistiesImport = '3050';
	/**
	* Phân công ban
	*/
	export const EventRegistiesAssign = '3060';
	/**
	* Duyệt phân ban
	*/
	export const EventRegistiesInternalAssign = '3070';
	export const EventRegistiesAssignOffer = '3080';
	/**
	* Quản lý trang đăng ký
	*/
	export const EventRegistyPagesBase = '40';
	/**
	* Thêm trang đăng ký
	*/
	export const EventRegistyPagesCreate = '4010';
	/**
	* Cập nhật trang đăng ký
	*/
	export const EventRegistyPagesUpdate = '4020';
	/**
	* Xóa trang đăng ký
	*/
	export const EventRegistyPagesDelete = '4030';
	/**
	* Lấy danh sách trang đăng ký
	*/
	export const EventRegistyPagesReadMany = '4040';
	/**
	* Lấy thông tin 1 trang đăng ký
	*/
	export const EventRegistyPagesReadOne = '4050';
	/**
	* Quản lý nhóm
	*/
	export const GroupsBase = '50';
	/**
	* Thêm nhóm
	*/
	export const GroupsCreate = '5010';
	/**
	* Cập nhật nhóm
	*/
	export const GroupsUpdate = '5020';
	/**
	* Xóa nhóm
	*/
	export const GroupsDelete = '5030';
	/**
	* Lấy danh sách nhóm
	*/
	export const GroupsReadMany = '5040';
	/**
	* Lấy thông tin 1 nhóm
	*/
	export const GroupsReadOne = '5050';
	/**
	* Quản lý điểm đến sau lễ
	*/
	export const LeaveAddressesBase = '60';
	/**
	* Thêm điểm đến sau lễ
	*/
	export const LeaveAddressesCreate = '6010';
	/**
	* Cập nhật điểm đến sau lễ
	*/
	export const LeaveAddressesUpdate = '6020';
	/**
	* Xóa điểm đến sau lễ
	*/
	export const LeaveAddressesDelete = '6030';
	/**
	* Lấy danh sách điểm đến sau lễ
	*/
	export const LeaveAddressesReadMany = '6040';
	/**
	* Lấy thông tin 1 điểm đến sau lễ
	*/
	export const LeaveAddressesReadOne = '6050';
	/**
	* Quản lý thời gian rời chùa
	*/
	export const LeaveTimesBase = '70';
	/**
	* Thêm thời gian rời chùa
	*/
	export const LeaveTimesCreate = '7010';
	/**
	* Cập nhật thời gian rời chùa
	*/
	export const LeaveTimesUpdate = '7020';
	/**
	* Xóa thời gian rời chùa
	*/
	export const LeaveTimesDelete = '7030';
	/**
	* Lấy danh sách thời gian rời chùa
	*/
	export const LeaveTimesReadMany = '7040';
	/**
	* Lấy thông tin 1 thời gian rời chùa
	*/
	export const LeaveTimesReadOne = '7050';
	/**
	* Quản lý điểm nhận thẻ
	*/
	export const ReceiveCardAddressesBase = '80';
	/**
	* Thêm điểm nhận thẻ
	*/
	export const ReceiveCardAddressesCreate = '8010';
	/**
	* Cập nhật điểm nhận thẻ
	*/
	export const ReceiveCardAddressesUpdate = '8020';
	/**
	* Xóa điểm nhận thẻ
	*/
	export const ReceiveCardAddressesDelete = '8030';
	/**
	* Lấy danh sách điểm nhận thẻ
	*/
	export const ReceiveCardAddressesReadMany = '8040';
	/**
	* Quản lý thời gian xuất phát
	*/
	export const StartTimesBase = '90';
	/**
	* Thêm thời gian xuất phát
	*/
	export const StartTimesCreate = '9010';
	/**
	* Cập nhật thời gian xuất phát
	*/
	export const StartTimesUpdate = '9020';
	/**
	* Xóa thời gian xuất phát
	*/
	export const StartTimesDelete = '9030';
	/**
	* Lấy danh sách thời gian xuất phát
	*/
	export const StartTimesReadMany = '9040';
	/**
	* Lấy thông tin 1 thời gian xuất phát
	*/
	export const StartTimesReadOne = '9050';
	/**
	* Quản lý người dùng
	*/
	export const MembersBase = '11';
	/**
	* Cập nhật người dùng
	*/
	export const MembersUpdate = '1110';
	/**
	* Xóa người dùng
	*/
	export const MembersDelete = '1120';
	/**
	* Lấy danh sách người dùng
	*/
	export const MembersReadMany = '1130';
	/**
	* Đọc thông tin của 1 người
	*/
	export const MembersReadOne = '1140';
	/**
	* Quản lý điểm xuất phát
	*/
	export const StartAddressesBase = '12';
	/**
	* Thêm điểm xuất phát
	*/
	export const StartAddressesCreate = '1210';
	/**
	* Cập nhật điểm xuất phát
	*/
	export const StartAddressesUpdate = '1220';
	/**
	* Xóa điểm xuất phát
	*/
	export const StartAddressesDelete = '1230';
	/**
	* Lấy danh sách điểm xuất phát
	*/
	export const StartAddressesReadMany = '1240';
	/**
	* Lấy thông tin 1 điểm xuất phát
	*/
	export const StartAddressesReadOne = '1250';
	/**
	* Quản lý nội dung trang đăng ký
	*/
	export const RegistrationPageContentsBase = '13';
	/**
	* Tạo nội dung
	*/
	export const RegistrationPageContentsCreate = '1310';
	/**
	* Cập nhật nội dung
	*/
	export const RegistrationPageContentsUpdate = '1320';
	/**
	* Xóa nội dung
	*/
	export const RegistrationPageContentsDelete = '1330';
	/**
	* Lấy danh sách nội dung
	*/
	export const RegistrationPageContentsReadMany = '1340';
	/**
	* Quản lý kỹ năng sở trường
	*/
	export const SkillForRegistersBase = '14';
	/**
	* Thêm kỹ năng
	*/
	export const SkillForRegistersCreate = '1410';
	/**
	* Cập nhật kỹ năng
	*/
	export const SkillForRegistersUpdate = '1420';
	/**
	* Xóa kỹ năng
	*/
	export const SkillForRegistersDelete = '1430';
	/**
	* Quản lý tài khoản
	*/
	export const UsersBase = '15';
	/**
	* Tạo tài khoản
	*/
	export const UsersCreate = '1510';
	/**
	* Cập nhật tài khoản
	*/
	export const UsersUpdate = '1520';
	/**
	* Xóa tài khoản
	*/
	export const UsersDelete = '1530';
	/**
	* Đọc thông tin của 1 tài khoản
	*/
	export const UsersReadOne = '1540';
	/**
	* Lấy danh sách tài khoản
	*/
	export const UsersReadMany = '1550';
}
