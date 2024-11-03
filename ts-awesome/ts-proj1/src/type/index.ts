// type Hosp struct {
// 	gorm.Model
// 	HospCode   string `json:"hospCode"`
// 	HospName   string `json:"hospName"`
// 	Level      string `json:"level"`
// 	LogoData   string `json:"logoData"`
// 	DistrictId uint   `json:"districtId"`
// 	OpenTime   string `json:"openTime"`
// }

export interface IHosp {
  id: number
  hospCode: string
  hospName: string
  level: string
  logoData: string
  districtId: number
  openTime: string
}

export interface IResp {
  code: number
  message: string
  // data: unknown
  ok: boolean
}

export interface IHospArrByCondPageResp extends IResp {
  data: {
    content: IHosp[]
    total: number
  }
}

export interface ILevelOrDistrictResp extends IResp {
  data: {
    id: number //          districtId
    value: string // level, districtId
  }[]
}

export interface IHospLikeNameResp extends IResp {
  data: IHosp[]
}
