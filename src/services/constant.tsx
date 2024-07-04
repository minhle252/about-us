"use client"
import axios from "axios";
// import 'dotenv/config'
const constants = {
	url_default: "http://localhost:5001/",
	url_config: "http://localhost:5001/api/",
	// url_default: "http://localhost:5001/",
	// url_config: "http://localhost:5001/api/",
	// url_default: "https://minhthuhandmade.com/",
	// url_config: "https://minhthuhandmade.com/api/",
	COLOR_PENDING: (opacity:number = 1)=> `rgb(82, 67, 170,${opacity})`,
	COLOR_CONFIRM: (opacity:number = 1)=> `rgb(0, 184, 217,${opacity})`,
	COLOR_IN_PROCESS: (opacity:number = 1)=> `rgb(255, 196, 0,${opacity})`,
	COLOR_SUCCESS: (opacity:number = 1)=> `rgb(0, 135, 90,${opacity})`,
	COLOR_FAIL: (opacity:number = 1)=> `rgb(255, 86, 48,${opacity})`,
	// list value permission
	PERMISSIONS: {
		DASHBOARD: 1,
		PRODUCT_MANAGE: 2,
		PRODUCT_CATEGORY: 3,
		PRODUCT:4,
		ORDER: 5,
		ORDER_MANAGE: 6,
		CONTENT: 7,
		NEWS_CATEGORY: 8,
		NEWS: 9,
		FACEBOOK: 10,
		USER: 11,
		USER_MANAGE: 12,
		CUSTOMER_MANAGE: 13,
		PER: 14,
	},
	// list images
	noImage: '/images/no-image.jpg',

	// function global
	configImage: (url:string) => {
		if(url && url.indexOf('http') != -1){
			return url;
        }else{
			return constants.url_default + url;
        }
	},
	formatColor: function (idStatus: number, opacity:number = 1){
		if(idStatus == 1){
			return this.COLOR_PENDING(opacity);
		}else if(idStatus == 2){
			return this.COLOR_CONFIRM(opacity);
		}else if(idStatus == 3){
			return this.COLOR_IN_PROCESS(opacity);
		}else if(idStatus == 4){
			return this.COLOR_SUCCESS(opacity);
		}else if(idStatus == 5){
			return this.COLOR_FAIL(opacity);
		}
	},
	formatNumber: function (number: string | number){
		let numberData = String(number).split(".");
		return  Number(numberData.join(""))
	},
	formatPrice: function (number:any){
		number = this.formatNumber(number)
		if(number && number > 0){
			return Number(number).toLocaleString('Vie')
		}else{
			return 0;
		}
	},
	checkPermissionFunc: function (listPer:any,number: string | number){
		let checkPer = false
		// console.log(listPer)
		if(Array.isArray(listPer)){
			listPer.forEach((item:any)=> {
				if(item.id == number && item.checked){
					checkPer = true;
				}
			})
		}
		return checkPer;
	},

	setObjectData: async function (object:any,upload=''){
		let token;
		if(typeof window !== 'undefined'){
			token = localStorage.getItem('token')
		}
		// let connectSid = await getConnectSidCookie();
		return await axios(
			{
				...object,
				withCredentials: true,
				headers: {
					"Content-Type": !upload?"application/json":"multipart/form-data",
					// Cookie: `connect.sid=${connectSid}`,
					'Authorization': `bearer ${token}`
				},
			}
		)
	},
	getTitlePage : (router:string) => {
		router = router.split('/')[1];
		let titlePage:string = '';
		if(router == 'productPage'){
			titlePage = 'Sản Phẩm';
		}else if (router == 'category'){
			titlePage = 'Danh Mục Sản Phẩm';
		}else if (router == 'order'){
			titlePage = 'Đơn Hàng';
		}else if (router == 'newsCategory'){
			titlePage = 'Danh Mục Tin Tức';
		}else if (router == 'news'){
			titlePage = 'Tin Tức';
		}else if (router == 'facebook'){
			titlePage = 'Facebook';
		}else if (router == 'users'){
			titlePage = 'Users';
		}else if (router == 'customers'){
			titlePage = 'Khách Hàng';
		}else if (router == 'permission'){
			titlePage = 'Phân quyền';
		}else{
			titlePage = 'Trang Chủ';
		}
		return titlePage;
	}
};

export default constants;
