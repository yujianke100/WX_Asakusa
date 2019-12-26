# WX_Asakusa
浅草寺一百观音签

##mysql:
* asakusa
  * userInfo
    * openid
    * context
    
##定时任务：

DROP EVENT `delete everyday`; CREATE DEFINER=`asakusa`@`localhost` EVENT `delete everyday` ON SCHEDULE EVERY 1 DAY STARTS '2019-12-27 00:00:00' ON COMPLETION PRESERVE ENABLE DO DELETE FROM userInfo WHERE 1
