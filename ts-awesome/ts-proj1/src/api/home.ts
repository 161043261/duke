import type {
  IHosContentListRespData,
  IHosContentRespData,
  IHosTypeOrDistrictRespData,
} from '@/type'
import axiosIns from '@/utils/axios_ins'

// const HOS_CONTENT = '/hosp/hospital/{page}/{limit}'

enum API_ENUM {
  HOS_CONTENT = '/hosp/hospital/',
  HOS_TYPE_OR_ADDR = '/cmn/dict/findByDictCode/',
  HOS_CONTENT_LIST = '/hosp/hospital/findByHosname/',
}

// const API = {
//   HOS_CONTENT: '/hosp/hospital/{page}/{limit}',
// }

// namespace API_NS {
//   export const HOS_CONTENT = '/hosp/hospital/{page}/{limit}'
// }

export async function reqHosContent(
  page: number,
  limit: number,
  hostype: string = '', // 隐式声明 hostype 是 ? 可选参数
  districtCode: string = '', // 隐式声明 districtCode 是 ? 可选参数
): Promise<IHosContentRespData> {
  // axiosIns.get(HOS_CONTENT          + `${page}/${limit}`)
  // axiosIns.get(API_ENUM.HOS_CONTENT + `${page}/${limit}`)
  // axiosIns.get(API.HOS_CONTENT      + `${page}/${limit}`)
  // axiosIns.get(API_NS.HOS_CONTENT   + `${page}/${limit}`)
  return axiosIns.get(
    API_ENUM.HOS_CONTENT +
      `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`,
  )
}

export async function reqHosTypeAndDistrict(
  districtCode: string,
): Promise<IHosTypeOrDistrictRespData> {
  return axiosIns.get(API_ENUM.HOS_TYPE_OR_ADDR + districtCode)
}

export async function reqHosContentList(
  hosname: string,
): Promise<IHosContentListRespData> {
  return axiosIns.get(API_ENUM.HOS_CONTENT_LIST + hosname)
}
