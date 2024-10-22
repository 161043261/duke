.PHONY: format

format:
	cd takeaway-common && mvn com.spotify.fmt:fmt-maven-plugin:format
	cd takeaway-data   && mvn com.spotify.fmt:fmt-maven-plugin:format
	cd takeaway-server && mvn com.spotify.fmt:fmt-maven-plugin:format

clean:
	cd takeaway-common && rm -rf target
	cd takeaway-data   && rm -rf target
	cd takeaway-server && rm -rf target
