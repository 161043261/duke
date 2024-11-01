package cmd

import (
	"bronya.com/go-proj1/src/conf"
	"bronya.com/go-proj1/src/global"
	"bronya.com/go-proj1/src/router"
)

// Start
// 1. 读取配置文件
// 2. 启动日志
// 3. 连接 mysql, 创建表
// 4. 连接 redis
// 5. 创建路由组, 启动路由器
func Start(confPath string) {
	conf.ReadConf(confPath)          //! 读取配置文件
	global.Logger = conf.NewLogger() //! 启动日志
	session, err := conf.InitMysql() //! 连接 mysql, 创建表

	if err != nil {
		global.Logger.Errorf("Connect mysql error %s", err.Error())
		panic(err.Error())
	}
	global.Database = session

	redisCli, err := conf.InitRedis() //! 连接 redis
	if err != nil {
		global.Logger.Errorf("Connect redis error %s", err.Error())
		panic(err.Error())
	}
	global.RedisCli = redisCli
	router.StartRouter() //! 创建路由组, 启动路由器
}

func Done() {
	global.Logger.Infoln("==================== Done! ====================")
}
