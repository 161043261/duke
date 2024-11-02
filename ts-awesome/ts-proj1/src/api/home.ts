import type {
  IHospContentArrRespData,
  IHospContentRespData,
  ILevelOrDistrictRespData,
} from '@/type'
import axiosIns from '@/utils/axios_ins'

// const Hosp_Page = '/hosp/page/{curr}/{limit}'

enum API_ENUM {
  Hosp_Page = '/hosp/page/', // 分页查询
  Hosp_LevelOrDistrict = '/hosp/levelOrDistrict/',
  Hosp_LikeName = '/hosp/likeName/',
}

// const API = {
//   Hosp_Page: '/hosp/page/{curr}/{limit}'
// }

// namespace API_NS {
//   export const Hosp_Page = '/hosp/page/{curr}/{limit}'
// }

export async function reqHospContent(
  curr: number,
  limit: number,
  level: string = '', // 隐式声明 level 是 ? 可选参数
  districtId: number = 0, // 隐式声明 districtId 是 ? 可选参数
): Promise<IHospContentRespData> {
  // axiosIns.get(HOSP_CONTENT_ARR1          + `${curr}/${limit}`)
  // axiosIns.get(API_ENUM.HOSP_CONTENT_ARR1 + `${curr}/${limit}`)
  // axiosIns.get(API.HOSP_CONTENT_ARR1      + `${curr}/${limit}`)
  // axiosIns.get(API_NS.HOSP_CONTENT_ARR1   + `${curr}/${limit}`)
  return axiosIns.get(
    API_ENUM.Hosp_Page +
      `${curr}/${limit}?level=${level}&districtId=${districtId}`,
  )
}

export async function reqLevelOrDistrict(
  mode: string,
): Promise<ILevelOrDistrictRespData> {
  return axiosIns.get(API_ENUM.Hosp_LevelOrDistrict + mode)
}

export async function reqHospContentArr(
  hospName: string,
): Promise<IHospContentArrRespData> {
  return axiosIns.get(API_ENUM.Hosp_LikeName + hospName)
}
