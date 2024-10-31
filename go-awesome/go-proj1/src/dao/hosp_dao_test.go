package dao_test

import (
	"bronya.com/go-proj1/src/cmd"
	"bronya.com/go-proj1/src/dao"
	"bronya.com/go-proj1/src/data"
	"fmt"
	"log"
	"testing"
)

func init() {
	cmd.Start("../../")
}

// TestFileName_FuncName
func TestHospDao_InsertHosp(t *testing.T) {

	districts := []string{
		"黄浦区", "徐汇区", "长宁区", "静安区", "普陀区",
		"虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区",
		"浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明区"}

	for i, district := range districts {
		for hospIdx := 1; hospIdx <= 3; hospIdx++ {
			districtIdx := i + 1
			hosp := data.Hospital{
				// 省.市.区编号.医院编号
				// "1.1." + strconv.Itoa(districtIdx) + "." + strconv.Itoa(hospIdx),
				HospCode: fmt.Sprintf("1.1.%v.%v", districtIdx, hospIdx),
				// "不卜庐 " + district + "第" + strconv.Itoa(districtIdx) + "医院"
				HospName:    fmt.Sprintf("不卜庐-%v第%v医院", district, districtIdx),
				HospLevel:   "三级甲等",
				LogoData:    "",
				ReleaseTime: "09:00",
			}
			log.Println("Hospital name: ", hosp.HospName)

			hospDao := dao.NewHospDao()
			_ = hospDao.InsertHosp(hosp)
		}
	}
}

func TestHospDao_SelectAllHosp(t *testing.T) {
	hospDao := dao.NewHospDao()
	hosps, _ := hospDao.SelectAllHosps()
	for _, hosp := range hosps {
		log.Println(hosp)
	}
}

func TestHospDao_SelectHospByDistrictCode(t *testing.T) {
	hospDao := dao.NewHospDao()
	hosp, _ := hospDao.SelectHospByDistrictCode("1.1.1.1")
	fmt.Printf("%#v", hosp)
}
