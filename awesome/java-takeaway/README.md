# java-takeaway

```shell
mvn archetype:generate
Choose a number or apply filter: 7
Define value for property 'groupId': com.bronya
Define value for property 'artifactId': takeaway-common

mvn archetype:generate
Choose a number or apply filter: 7
Define value for property 'groupId': com.bronya
Define value for property 'artifactId': takeaway-data

mvn archetype:generate
Choose a number or apply filter: 7
Define value for property 'groupId': com.bronya
Define value for property 'artifactId': takeaway-server

touch pom.xml

rm -rf .mvn takeaway-common/.mvn takeaway-data/.mvn takeaway-server/.mvn
```
