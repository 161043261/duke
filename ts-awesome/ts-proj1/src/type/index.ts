export interface IHospContent {
  id: string
  hospCode: string
  hospName: string
  hospLevel: string
  districtCode: string
  logoData: string
  releaseTime: string
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

export interface IHospLevelOrDistrict {
  name: string
  value: string
}

export interface IHospLevelOrDistrictRespData extends IRespData {
  data: IHospLevelOrDistrict[]
}

export interface IHospContentArrRespData extends IRespData {
  data: IHospContent[]
}
