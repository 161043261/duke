package router

import "bronya.com/go-proj1/src/api"

func UseHospRg() {
	hospApi := api.NewHospApi()
	hospRg := rg.Group("/hosp") // 路由前缀
	hospRg.GET("/condPage/:curr/:limit", hospApi.SelectHospByCondPage)
	hospRg.GET("/levelOrDistrict/:mode", hospApi.SelectLevelOrDistrict)
	hospRg.GET("/likeName/:hospName", hospApi.SelectHospLikeName)
}
