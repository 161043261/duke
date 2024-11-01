import type {
    IHospContentArrRespData,
    IHospContentRespData,
    ILevelOrDistrictRespData,
} from '@/type'
import axiosIns from '@/utils/axios_ins'

// const HOSP_CONTENT_ARR1 = '/hosp/hospital/{page}/{limit}'

enum API_ENUM {
  HOSP_CONTENT_ARR1 = '/hosp/page/', // 分页查询
  HOSP_LEVEL_AND_DISTRICT = '/hosp/levelOrDistrict/',
  HOSP_CONTENT_ARR2 = '/hosp/likeName/',
}

// const API = {
//   HOSP_CONTENT_ARR1: '/hosp/hospital/{page}/{limit}',
// }

// namespace API_NS {
//   export const HOSP_CONTENT_ARR1 = '/hosp/hospital/{curr}/{limit}'
// }

export async function reqHospContent(
  curr: number,
  limit: number,
  hospLevel: string = '', // 隐式声明 hospLevel 是 ? 可选参数
  districtCode: string = '', // 隐式声明 districtCode 是 ? 可选参数
): Promise<IHospContentRespData> {
  // axiosIns.get(HOSP_CONTENT_ARR1          + `${curr}/${limit}`)
  // axiosIns.get(API_ENUM.HOSP_CONTENT_ARR1 + `${curr}/${limit}`)
  // axiosIns.get(API.HOSP_CONTENT_ARR1      + `${curr}/${limit}`)
  // axiosIns.get(API_NS.HOSP_CONTENT_ARR1   + `${curr}/${limit}`)
  return axiosIns.get(
    API_ENUM.HOSP_CONTENT_ARR1 +
      `${curr}/${limit}?hospLevel=${hospLevel}&districtCode=${districtCode}`,
  )
}

export async function reqLevelOrDistrict(
  mode: string
): Promise<ILevelOrDistrictRespData> {
  return axiosIns.get(API_ENUM.HOSP_LEVEL_AND_DISTRICT + mode)
}

export async function reqHospContentArr(
  hospName: string,
): Promise<IHospContentArrRespData> {
  return axiosIns.get(API_ENUM.HOSP_CONTENT_ARR2 + hospName)
}
