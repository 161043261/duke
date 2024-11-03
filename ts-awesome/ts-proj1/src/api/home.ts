import type {
  IHospLikeNameResp,
  IHospArrByCondPageResp,
  ILevelOrDistrictResp,
} from '@/type'

import axiosIns from '@/utils/axios_ins'

// const Hosp_CondPage = '/hosp/page/{curr}/{limit}'

enum API_ENUM {
  Hosp_CondPage = '/hosp/condPage/', // 分页查询
  Hosp_LevelOrDistrict = '/hosp/levelOrDistrict/',
  Hosp_LikeName = '/hosp/likeName/',
}

// const API = {
//   Hosp_CondPage: '/hosp/condPage/${curr}/${limit}'
// }

// namespace API_NS {
//   export const Hosp_CondPage = '/hosp/condPage/${curr}/${limit}'
// }

export async function repHospArrByCondPage(
  // argv
  curr: number,
  limit: number,
  levelId: number = 0, // 隐式声明 levelId 是 ? 可选参数
  districtId: number = 0, // 隐式声明 districtId 是 ? 可选参数
): Promise<IHospArrByCondPageResp> {
  // axiosIns.get(HOSP_CONTENT_ARR1          + `${curr}/${limit}`)
  // axiosIns.get(API_ENUM.HOSP_CONTENT_ARR1 + `${curr}/${limit}`)
  // axiosIns.get(API.HOSP_CONTENT_ARR1      + `${curr}/${limit}`)
  // axiosIns.get(API_NS.HOSP_CONTENT_ARR1   + `${curr}/${limit}`)
  return axiosIns.get(
    API_ENUM.Hosp_CondPage +
      `${curr}/${limit}?levelId=${levelId}&districtId=${districtId}`,
  )
}

export async function reqLevelOrDistrict(
  // argv
  mode: string,
): Promise<ILevelOrDistrictResp> {
  return axiosIns.get(API_ENUM.Hosp_LevelOrDistrict + mode)
}

export async function reqHospLikeName(
  // argv
  hospName: string,
): Promise<IHospLikeNameResp> {
  return axiosIns.get(API_ENUM.Hosp_LikeName + hospName)
}
