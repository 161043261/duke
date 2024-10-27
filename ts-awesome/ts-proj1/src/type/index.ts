export interface IHospitalInfo {
  address: string
  bookingRule: {
    cycle: number
    quitDay: number
    quitTime: string
    releaseTime: string
    rule: Array<string>
    stopTime: string
  }
  cityCode: string
  districtCode: string
  hoscode: string
  hosname: string
  id: string
  intro?: unknown
  isDeleted: number
  logoData: string
  param: {
    fullAddress: string
    hostypeString: string
  }
  provinceCode: string
  route: string
  status: number
  updateTime: string
}

export interface IRespData {
  code: number
  data: {
    content: Array<IHospitalInfo>
    totalElements: number
  }
  message: string
  ok: boolean
}
