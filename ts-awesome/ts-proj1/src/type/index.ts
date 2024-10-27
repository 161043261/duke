export interface IHospitalInfo {
  id: string
  createTime: string
  updateTime: string
  isDeleted: number

  param: {
    hostypeString: string
    fullAddress: string
  }
  hoscode: string
  hosname: string
  hostype: string
  provinceCode: string
  cityCode: string
  districtCode: string
  address: string
  logoData: string
  intro?: string
  route: string
  status: number

  bookingRule: {
    cycle: number
    releaseTime: string
    stopTime: string
    quitDay: number
    quitTime: string
    rule: string[] // 等价于 Array<string>
  }
}

export interface IRespData {
  code: number
  message: string
  ok: boolean
}

export interface IHospitalRespData extends IRespData {
  data: {
    content: Array<IHospitalInfo> // 等价于 IHospitalInfo[]
    pagetable: {
      sort: {
        sorted: boolean
        unsorted: boolean
        empty: boolean
      }
      pageNumber: number
      pageSize: number
      offset: number
      paged: boolean
      unpaged: boolean
    }
    totalPages: number
    totalElements: number
    last: boolean
    first: boolean
    //??? redundant
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    numberOfElements: number
    size: number
    number: number
    empty: boolean
  }
}
