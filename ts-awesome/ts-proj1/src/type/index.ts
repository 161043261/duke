export interface IHospContent {
  id: string
  hospCode: string
  hospName: string
  level: string
  districtName: string
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

export interface ILevelOrDistrictRespData extends IRespData {
  data: string[]
}

export interface IHospContentArrRespData extends IRespData {
  data: IHospContent[]
}
