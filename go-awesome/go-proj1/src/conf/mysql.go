package conf

import (
	"bronya.com/go-proj1/src/data"
	"github.com/spf13/viper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	gormLogger "gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

func InitMysql() (*gorm.DB, error) {
	gormLogMod := gormLogger.Info
	if viper.GetString("buildType") == "Release" {
		gormLogMod = gormLogger.Error
	}

	//! 开启会话 session
	db, err := gorm.Open(mysql.Open(viper.GetString("db.mysqlDsn")), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: false, //! 单数表名, 默认 false
			TablePrefix:   "t_",  //! 表名前缀 t_
		},
		Logger: gormLogger.Default.LogMode(gormLogMod),
	})

	if err != nil {
		return nil, err
	}
	//! 从 go 结构体自动迁移到 db 表, 创建表
	_ = db.AutoMigrate(&data.Hosp{})     //* 传递指向一个 data.Hosp 对象的指针
	_ = db.AutoMigrate(&data.District{}) //* 传递指向一个 data.District 对象的指针
	return db, nil
}
