export interface IHospContent {
  id: string
  hospCode: string
  hospName: string
  hospLevel: string
  districtCode: string
  logoData: string
  openTime: string
}

export interface IRespData {
  code: number
  message: string
  // data: unknown
  ok: boolean
}

export interface IHospContentRespData extends IRespData {
  data: {
    content: IHospContent[]
    totalHosp: number
  }
}

export interface ILevelOrDistrict {
  name: string
  value: string
}

export interface ILevelOrDistrictRespData extends IRespData {
  data: ILevelOrDistrict[]
}

export interface IHospContentArrRespData extends IRespData {
  data: IHospContent[]
}
