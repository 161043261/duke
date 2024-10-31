package service

import "bronya.com/go-proj1/src/dao"

type HospService struct {
	HospDao *dao.HospDao
}

// ! HospService 单例
var hospService *HospService
