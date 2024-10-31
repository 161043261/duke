import type {
  IHospContentArrRespData,
  IHospContentRespData,
  IHospLevelOrDistrictRespData,
} from '@/type'
import axiosIns from '@/utils/axios_ins'

// const HOSP_CONTENT_ARR1 = '/hosp/hospital/{page}/{limit}'

enum API_ENUM {
  HOSP_CONTENT_ARR1 = '/hosp/hospital/', // 分页查询
  HOSP_LEVEL_OR_DISTRICT = '/hosp/getEqualDistrictCode/', // = districtCode
  HOSP_CONTENT_ARR2 = '/hosp/getLikeHospName/', // like hospName
}

// const API = {
//   HOSP_CONTENT_ARR1: '/hosp/hospital/{page}/{limit}',
// }

// namespace API_NS {
//   export const HOSP_CONTENT_ARR1 = '/hosp/hospital/{page}/{limit}'
// }

export async function reqHospContent(
  page: number,
  limit: number,
  hospLevel: string = '', // 隐式声明 hospLevel 是 ? 可选参数
  districtCode: string = '', // 隐式声明 districtCode 是 ? 可选参数
): Promise<IHospContentRespData> {
  // axiosIns.get(HOSP_CONTENT_ARR1          + `${page}/${limit}`)
  // axiosIns.get(API_ENUM.HOSP_CONTENT_ARR1 + `${page}/${limit}`)
  // axiosIns.get(API.HOSP_CONTENT_ARR1      + `${page}/${limit}`)
  // axiosIns.get(API_NS.HOSP_CONTENT_ARR1   + `${page}/${limit}`)
  return axiosIns.get(
    API_ENUM.HOSP_CONTENT_ARR1 +
      `${page}/${limit}?hospLevel=${hospLevel}&districtCode=${districtCode}`,
  )
}

export async function reqHospLevelOrDistrict(
  districtCode: string,
): Promise<IHospLevelOrDistrictRespData> {
  return axiosIns.get(API_ENUM.HOSP_LEVEL_OR_DISTRICT + districtCode)
}

export async function reqHospContentArr(
  hospName: string,
): Promise<IHospContentArrRespData> {
  return axiosIns.get(API_ENUM.HOSP_CONTENT_ARR2 + hospName)
}
