package router

import (
	"bronya.com/go-proj1/src/global"
	"bronya.com/go-proj1/src/middleware"
	"context"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"net/http"
	"os/signal"
	"syscall"
	"time"
)

var rg *gin.RouterGroup

func StartRouter() {
	notifyCtx, notifyCancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer notifyCancel()

	//! 创建 gin 默认引擎
	engine := gin.Default()

	//! 创建根路由组
	rg = engine.Group("/api/v1")
	UseHospRg()

	//! 使用 gin 跨域中间件
	engine.Use(middleware.Cors())

	port := viper.GetString("server.port") // 3333
	if port == "" {
		port = "8080"
	}
	server := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: engine,
	}

	//! 在新协程中启动服务器, 主协程不会阻塞, 继续运行
	go func() {
		global.Logger.Infof("Serving on http://127.0.0.1:%s", port)
		//! 不建议使用 err != http.ErrServerClosed
		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			global.Logger.Errorf("Serve error %s", err.Error())
			return
		}
	}()

	<-notifyCtx.Done()

	timoutCtx, timeoutCancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer timeoutCancel()

	if err := server.Shutdown(timoutCtx); /* server.Shutdown(timeoutCtx) 会执行 <-timoutCtx.Done() */
	err != nil {
		global.Logger.Errorf("Shutdown error %s", err.Error())
	}
	// <-timoutCtx.Done()
	global.Logger.Infoln("Shutdown ok")
}
