# 7 | enter (maven-archetype-quickstart)
# groupId: com.bronya
# artifactId: java-kafka
# 生成 maven 项目
mvn archetype:generate

# 使用 maven 包装器
mvn wrapper:wrapper

# 打包
./mvnw package -DskipTests

# 格式化
./mvnw com.spotify.fmt:fmt-maven-plugin:format