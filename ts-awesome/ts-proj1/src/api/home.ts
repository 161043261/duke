import type { IHosContentRespData, IHosTypeAndAddrRespData } from '@/type'
import axiosIns from '@/utils/axios_ins'

// const HOS_CONTENT = '/hosp/hospital/{page}/{limit}'

enum API_ENUM {
  HOS_CONTENT = '/hosp/hospital/',
  HOS_TYPE_AND_ADDR = '/cmn/dict/findByDictCode/',
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
): Promise<IHosContentRespData> {
  // axiosIns.get(HOS_CONTENT          + `${page}/${limit}`)
  // axiosIns.get(API_ENUM.HOS_CONTENT + `${page}/${limit}`)
  // axiosIns.get(API.HOS_CONTENT      + `${page}/${limit}`)
  // axiosIns.get(API_NS.HOS_CONTENT   + `${page}/${limit}`)
  return axiosIns.get(API_ENUM.HOS_CONTENT + `${page}/${limit}`)
}

export async function reqHosTypeAndAddr(
  dictCode: string,
): Promise<IHosTypeAndAddrRespData> {
  return axiosIns.get(API_ENUM.HOS_TYPE_AND_ADDR + dictCode)
}
