package conf

import (
	"fmt"
	"github.com/spf13/viper"
)

// ReadConf 读取配置文件
func ReadConf(confPath string) {
	// ./main 和 ./settings.yml 都在项目根目录下
	viper.AddConfigPath(confPath)
	viper.SetConfigName("settings")
	viper.SetConfigType("yaml")
	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Sprintf("Read in config error %s", err.Error()))
	}
}
