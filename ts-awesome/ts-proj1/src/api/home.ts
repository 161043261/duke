import type { IHospitalRespData } from '@/type'
import axiosIns from '@/utils/axios_ins'

// const HOSPITAL_INFO = '/hosp/hospital/{page}/{limit}'

enum API_ENUM {
  HOSPITAL_INFO = '/hosp/hospital/',
}

// const API_OBJ = {
//   HOSPITAL_INFO: '/hosp/hospital/{page}/{limit}',
// }

// namespace API_NS {
//   export const HOSPITAL_INFO = '/hosp/hospital/{page}/{limit}'
// }

export async function reqHospitalInfo(
  page: number,
  limit: number,
): Promise<IHospitalRespData> {
  // axiosIns.get(HOSPITAL_INFO          + `${page}/${limit}`)
  // axiosIns.get(API_ENUM.HOSPITAL_INFO + `${page}/${limit}`)
  // axiosIns.get(API_OBJ.HOSPITAL_INFO  + `${page}/${limit}`)
  // axiosIns.get(API_NS.HOSPITAL_INFO   + `${page}/${limit}`)
  return axiosIns.get(API_ENUM.HOSPITAL_INFO + `${page}/${limit}`)
}
