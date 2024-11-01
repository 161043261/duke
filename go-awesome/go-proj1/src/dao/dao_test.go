package dao_test

import (
	"bronya.com/go-proj1/src/cmd"
	"bronya.com/go-proj1/src/dao"
	"bronya.com/go-proj1/src/data"
	"fmt"
	"log"
	"os"
	"testing"
)

var districts = [...]string{
	"黄浦区", "徐汇区", "长宁区", "静安区", "普陀区",
	"虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区",
	"浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明区"}

var levels = [...]string{
	"三级甲等", "三级乙等", "三级丙等",
	"二级甲等", "二级乙等", "二级丙等",
	"一级甲等", "一级乙等", "一级丙等",
}
var hospDao *dao.HospDao
var districtDao *dao.DistrictDao

func init() {
	cmd.Init("../../")
	hospDao = dao.NewHospDao()
	districtDao = dao.NewDistrictDao()
}

// TestFileName_FuncName
// ! go test -run TestHospDao_InsertHosp
func TestHospDao_InsertHosp(t *testing.T) {

	// 读文件
	b64Str, _ := os.ReadFile("./qiqi.txt")

	hospId, levelIdx := 1, 0
	for i, districtName := range districts {
		for j := 0; j < 3; j, hospId, levelIdx =
			j+1, hospId+1, (levelIdx+1)%len(levels) {

			districtId := uint(i + 1)
			hosp := data.Hosp{
				// 区编号.医院编号
				// strconv.Itoa(districtId) + "." + strconv.Itoa(hospId),
				HospCode: fmt.Sprintf("%v.%v", districtId, hospId),
				// "不卜庐 " + districtName + "第" + strconv.Itoa(districtIdx) + "医院"
				HospName:   fmt.Sprintf("不卜庐-%v第%v医院", districtName, districtId),
				Level:      levels[levelIdx],
				LogoData:   string(b64Str),
				DistrictId: districtId,
				OpenTime:   "09:00",
			}
			log.Println("hosp_name:", hosp.HospName)
			err := hospDao.InsertHosp(hosp)
			if err != nil {
				log.Fatal(err)
			}
		}
	}
}

func TestHospDao_SelectAllHosp(t *testing.T) {
	hospArr, _ := hospDao.SelectAllHosp()
	for _, hosp := range hospArr {
		log.Println(hosp)
	}
}

func TestHospDao_SelectAllLevel(t *testing.T) {
	levelArr, _ := hospDao.SelectAllLevel()
	for _, level := range levelArr {
		log.Println(level)
	}
}

func TestHospDao_SelectHospArrByDistrictId(t *testing.T) {
	hospArr, err := hospDao.SelectHospByDistrictId(1)
	if err != nil {
		log.Fatalln(err.Error())
	}
	for _, hosp := range hospArr {
		log.Println(hosp)
	}
}

// ! go test -run TestDistrictDao_InsertDistrict
func TestDistrictDao_InsertDistrict(t *testing.T) {
	for _, districtName := range districts {
		district := data.District{
			DistrictName: districtName,
		}
		err := districtDao.InsertDistrict(district)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func TestDistrictDao_SelectAllDistrict(t *testing.T) {
	districtArr, err := districtDao.SelectAllDistrict()
	if err != nil {
		log.Fatal(err)
	}
	for _, district := range districtArr {
		log.Println(district)
	}
}
