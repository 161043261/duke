package com.bronya.concurrent;

public class Main {
  public static void main(String[] args) {
    System.out.println(
        """
       <!-- 打包 fat-jar -->
       <artifactId>maven-assembly-plugin</artifactId>
       <version>3.3.0</version>
       <executions>
         <execution>
           <id>thread.Main</id>
           <phase>package</phase>
           <goals>
             <goal>single</goal>
           </goals>
           <configuration>
             <descriptorRefs>
               <descriptorRef>jar-with-dependencies</descriptorRef>
             </descriptorRefs>
             <archive>
               <manifest>
                 <!-- 指定主类 -->
                 <mainClass>com.bronya.thread.Main</mainClass>
               </manifest>
             </archive>
           </configuration>
         </execution>
       </executions>
       """);
  }
}
