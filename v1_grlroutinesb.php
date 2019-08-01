<?php

// ================= data importer ====================================

/*
grlmatch_domainid               myleague
grlmatch_periodid               2017-18
grlmatch_competitionid          L_leagueid    or    C_cupid
grlmatch_id                     YYYYMMDDHHMM_hteamid_ateamid
grlmatch_hometeamid
grlmatch_hometeamname
grlmatch_hometeamplayerlist     playid1,playid2,playid3   
grlmatch_hometeamstatslist      playid1,event,parm1,parm2|playid2,event,parm1,parm3|playid1,event,parm1,parm2
grlmatch_awayteamid
grlmatch_awayteamname
grlmatch_awayteamplayerlist
grlmatch_awayteamstatslist    playid1,event,parm1,parm2|playid2,event,parm1,parm3|playid1,event,parm1,parm2
grlmatch_date
grlmatch_time
grlmatch_grlvenueid
grlmatch_grlvenuename
grlmatch_homegfull
grlmatch_homeghalf
grlmatch_awaygfull
grlmatch_awayghalf
grlmatch_attendance
*/

function Grl_GRLRESULTSIMPORTER_CSSJS () {
    $GLOBALS{'SITECSSOPTIONAL'} = "jqdatatables";
    $GLOBALS{'SITEJSOPTIONAL'} = "jqdatatablesmin,report";
}


function Grl_GRLRESULTSIMPORTER_Output () {
    
    function test_null($var)
    {
        if ($var != null){
           return($var); 
        }
        
    }
    
    Truncate_Table ("grlclub");
    Truncate_Table ("grlteam");
    Truncate_Table ("grlvenue");
    Truncate_Table ("grlplayer");
    Truncate_Table ("grlmatch");
    
    $MMa = Array("January"=>"01","February"=>"02","March"=>"03","April"=>"04","May"=>"05","June"=>"06","July"=>"07","August"=>"08","September"=>"09","October"=>"10","November"=>"11","December"=>"12");
    
    $matchcounter = "0";
    $matchcentrecounter = "0";
    $matcha = Array();
    $teamscorera = Array();
    $leagueinfo = "0";
    for ($i = 1; $i< 13; $i++){
        if ($i < 10){
            if ($i <= 5 ){
                $year = "2018";
            }
            else{$year = "2017";}
            $i = "0".$i;
        }
        else{$year = "2017";}
        //XH3($year." -- ".$i);
        $html = file_get_contents('http://www.evostikleaguesouthern.co.uk/match-info/results/'.$year.'-'.$i);
        $htmla = explode("<",$html);
        
        foreach ($htmla as $htmlline) {
    
            if (strlen(strstr($htmlline,"u-trailing-border--small u-pad-top--small u-pad-horizontal--tiny u-hover-bg-grey-wash"))>0){
                $matchcentrecounter++;
                $matchida = explode("match-centre/",$htmlline);
                $matchid = $matchida[1];
                $matchidchecka = explode("-",$matchid);
                $match_ref = substr($matchid,0,9);
                //array_push($matchidarray,$match_id);
                /*if ($matchidchecka[0] == "1"){
                    $html2 = file_get_contents('http://www.evostikleaguesouthern.co.uk/match-info/match-centre/'.$match_id);
                    $html2a = explode("<",$html2);
                    foreach ($html2a as $htmlline2) {
                        if (strlen(strstr($htmlline2,"meta name=&#34;description&#34; content"))>0){
                            $timea = explode(",",$htmlline2);
                            $matchtime = $timea[1];
                            XH3($matchtime);
                            break;
                        }
                    }
                }*/
            }
            if (strlen(strstr($htmlline,"o-layout layout--tiny"))>0){
                //print "&lt;<font color=green>".$htmlline."</font><br>\n";
                if ($teamcounter != "0"){
                    $matcha[$matchkey]["hgoals"][$teamcounter] = $hgoals;
                    $matcha[$matchkey]["fgoals"][$teamcounter] = $fgoals;
                }
                $teamcounter = "0";
                $matchcounter++;
                $scorerlist = "";
                $playerlist = "";
                $leagueinfo = "0";
                $matchkey = "match_".$matchcounter;
                //XH2($matchkey);
                $matcha[$matchkey]["match_ref"][0] = $match_ref;
                
            }
            if (strlen(strstr($htmlline,"Att."))>0){
                //print "&lt;<font color=green>".$htmlline."</font><br>\n";
                $matchattendancea = explode("Att.",$htmlline);
                $matchattendance = $matchattendancea[1];
                $matcha[$matchkey]["attendance"][0] = $matchattendance;
                
            }
            elseif (strlen(strstr($htmlline,"u-text-ellipsis u-block "))>0){
                //print "&lt;<font color=orange>".$htmlline."</font><br>\n";
                if ($teamcounter != "0"){
                    $matcha[$matchkey]["hgoals"][$teamcounter] = $hgoals;
                    $matcha[$matchkey]["fgoals"][$teamcounter] = $fgoals;
                }
                $hgoals = 0;
                $fgoals = 0;
                $teamcounter++;
                $scorerlist = "";
                $playerlist = "";
                $teamscorera = Array();
                $teama = explode(">",$htmlline);
                $team = $teama[1];
                $teamname = $teama[1];
                $teamname = trim($teamname);
                
                $team = str_replace("Town","",$team);
                $team = str_replace("United","",$team);
                $team = str_replace("Borough","",$team);
                $team = str_replace("City","",$team);
                $team = str_replace("AFC","",$team);
                $team = str_replace("Rovers","",$team);
                $team = str_replace("&amp;","",$team);
                $team = str_replace("&","",$team);
                $team = str_replace(",","",$team);
                $team = str_replace(" ","",$team);
                $team = str_replace("039","",$team);                
                $team = preg_replace("/[^a-zA-Z0-9]/", "", $team);

                $matcha[$matchkey]["teamid"][$teamcounter] = $team;
                $matcha[$matchkey]["team"][$teamcounter] = $teamname;
                /*if (count($teamida) == 93){
                    
                }
                elseif (count($teamida) == 94){
                    if (strlen(strstr($team,"Town"))>0){
                        $teamid =  str_replace("Town","",$team);
                    }
                    else{$teamid =  str_replace(" ","",$team);}
                }
                elseif (count($teamida) == 95){
                    if (strlen(strstr($team,"Town"))>0){
                        $teamid1 =  str_replace("Town","",$team);
                        $teamid =  str_replace(" ","",$teamid1);
                    }
                    else{$teamid =  str_replace(" ","",$team);}
                    
                }*/
                if ($teamcounter == "2"){
                    if ($matchcounter != "0"){
                        $match_tid = $matchtimestamp."-".$matcha[$matchkey]["teamid"][1]."-".$matcha[$matchkey]["teamid"][2];
                        $matcha[$matchkey]["match-id"][0] = $match_tid;
                        //XH3($match_tid);
                    }
                }

                //============= Write Reference Data =================================
                Check_Data ('grlclub',$GLOBALS{'currperiodid'},$team);
                if ($GLOBALS{'IOWARNING'} == "1") {
                    Initialise_Data('grlclub');
                    // grlclub_periodid
                    // grlclub_id
                    $GLOBALS{'grlclub_name'} = $teamname;
                    $GLOBALS{'grlclub_teamlist'} = $team;
                    $GLOBALS{'grlclub_primevenueid'} = $team;
                    $GLOBALS{'grlclub_othervenueid'} = "";
                    $imagefilename = $GLOBALS{'domainwwwpath'}.'/domain_media/'.'Club_'.$team.'_'.$team.'_FixedSize_250x250.jpg';
                    if (file_exists($imagefilename)) {
                        $GLOBALS{'grlclub_logo'} = 'Club_'.$team.'_'.$team.'_FixedSize_250x250.jpg';
                    } else {
                        $GLOBALS{'grlclub_logo'} = "";
                    }
                    $GLOBALS{'grlclub_introduction'} = "";
                    Write_Data('grlclub',$GLOBALS{'currperiodid'},$team);
                    XPTXTCOLOR("Club - (".$team.") ".$teamname." created","blue");
                }
                
                Check_Data ('grlvenue',$team);
                if ($GLOBALS{'IOWARNING'} == "1") {
                    Initialise_Data('grlvenue');
                    // grlvenue_id
                    $GLOBALS{'grlvenue_name'} = $teamname." Home Venue";
                    $GLOBALS{'grlvenue_address'} = "";
                    $GLOBALS{'grlvenue_postcode'} = "";
                    $GLOBALS{'grlvenue_mapref'} = "";
                    Write_Data('grlvenue',$team);
                    XPTXTCOLOR("Venue - (".$team.") ".$teamname." Home Venue"." created","blue");
                }
                
                Check_Data ('grlteam',$GLOBALS{'currperiodid'},$team);
                if ($GLOBALS{'IOWARNING'} == "1") { 
                    Initialise_Data('grlteam');
                    // grlteam_periodid
                    // grlteam_id
                    $GLOBALS{'grlteam_name'} = $teamname;
                    $GLOBALS{'grlteam_grlclubid'} = $grlteam;
                    $GLOBALS{'grlteam_mgr'} = "";
                    $GLOBALS{'grlteam_coach'} = "";
                    $GLOBALS{'grlteam_captain'} = "";
                    $GLOBALS{'grlteam_admin'} = "";
                    $GLOBALS{'grlteam_grlleagueid'} = "";
                    $GLOBALS{'grlteam_grlcupid'} = "";
                    $GLOBALS{'grlteam_squadlist'} = "";
                    $GLOBALS{'grlteam_photo'} = "";
                    Write_Data('grlteam',$GLOBALS{'currperiodid'},$team);
                    XPTXTCOLOR("Team - (".$team.") ".$teamname." created","red");
                }

            }
            elseif ((strlen(strstr($htmlline,"small>"))>0)&&(strlen(strstr($htmlline,"/"))) == 0){
                //print "&lt;<font color=red>".$htmlline."</font><br>\n";
                $goalscorera = explode(">",$htmlline);
                $goalscorerstats = $goalscorera[1];
                $goala = explode("'",$goalscorerstats);
                $goal2a = explode(" ",$goala[0]);
                $penstatus = $goala[1];
                $penstatus = str_replace(" ","",$penstatus);
                $penstatus = preg_replace("/[^a-zA-Z0-9]/", "", $penstatus);
                //XH3($penstatus);
                $goalscorerinfoa = array_values(array_filter($goal2a,"test_null"));
                //print_r($goalscorerinfoa);
                
                $fname = $goalscorerinfoa[1];
                $sname = $goalscorerinfoa[2];
                $fnamex = preg_replace("/[^a-zA-Z0-9]/", "", $fname);                
                $snamex = preg_replace("/[^a-zA-Z0-9]/", "", $sname);
                $goalminute = $goalscorerinfoa[3];
                if (strlen($snamex) < 3){
                    substr($fnamex,0,1).substr($snamex,0,2);
                } else {
                    $playerid = substr($fnamex,0,1).substr($snamex,0,3);
                }

                $goalscorer = $playerid.",G,".$goalminute.",".$penstatus;
                if ($playerlist == "") {
                    $playerlist = $playerid;
                } else {
                    $playerlist = $playerid.",".$playerlist;
                }
                if ($scorerlist == ""){
                    $scorerlist = $goalscorer;
                } else {
                    $scorerlist = $goalscorer."|".$scorerlist;
                }
                if ($goalminute <= 45){
                    $hgoals++;
                    $fgoals++;
                } else{ $fgoals++; }
                //XH3("SCORE LIST: ".$scorerlist);
                $matcha[$matchkey]["goals"][$teamcounter] = $scorerlist;
                $matcha[$matchkey]["players"][$teamcounter] = $playerlist;
                
                
                Check_Data ('grlplayer',$playerid);
                if ($GLOBALS{'IOWARNING'} == "1") {
                    Initialise_Data('grlplayer');
                    // grlplayer_id
                    $GLOBALS{'grlplayer_fname'} = $fname;
                    $GLOBALS{'grlplayer_sname'} = $sname;
                    $GLOBALS{'grlplayer_photo'} = "";
                    $GLOBALS{'grlplayer_profile'} = "";
                    $GLOBALS{'grlplayer_position'} = "";
                    $GLOBALS{'grlplayer_teamid'} = $team;
                    $GLOBALS{'grlplayer_email'} = "";
                    $GLOBALS{'grlplayer_mobile'} = "";
                    Write_Data('grlplayer',$playerid);
                    XPTXTCOLOR("Player - ".$playerid." ".$fname." ".$sname." ".$GLOBALS{'grlplayer_teamid'}." created.","green");
                }                
                
            }
            elseif (strlen(strstr($htmlline,"u-one-sixth u-text-center"))>0){
                //print "&lt;<font color=blue>".$htmlline."</font><br>\n";
                $scorea = explode(">",$htmlline);
                $score = $scorea[1];
                $score = str_replace(" ","",$score);
                XPTXT($score);
                $matcha[$matchkey]["score"] = $score;
            }
            elseif (strlen(strstr($htmlline,"c-heading heading--block-light"))>0){
                $leagueinfo = "1";
                //print "&lt;".$htmlline."</font><br>\n";
            }
            elseif (strlen(strstr($htmlline,"heading__title"))>0){
                if (((strlen(strstr($htmlline,"2017"))>0)||(strlen(strstr($htmlline,"2018"))>0))&&(((strlen(strstr($htmlline,"Monday"))>0))||((strlen(strstr($htmlline,"Tuesday"))>0))||((strlen(strstr($htmlline,"Wednesday"))>0))||((strlen(strstr($htmlline,"Thursday"))>0))||((strlen(strstr($htmlline,"Friday"))>0))||((strlen(strstr($htmlline,"Saturday"))>0))||((strlen(strstr($htmlline,"Sunday"))>0)))){
                    //print "&lt;<font color=pink>".$htmlline."</font><br>\n";
                    $matchdatea = explode(">",$htmlline);
                    $matchdate = $matchdatea[1];
                    $matchyyyya = explode(" ",$matchdate);
                    
                    if ($matchyyyya[1] == null){
                        $matchdd = $matchyyyya[2];
                        $matchmm = $matchyyyya[3];
                        $matchyyyy = $matchyyyya[4];
                    }
                    else{
                        $matchdd = $matchyyyya[1];
                        $matchmm = $matchyyyya[2];
                        $matchyyyy = $matchyyyya[3];
                    }
                    if ((int)$matchdd < 10){
                        $matchdd = "0".$matchdd;
                    }
                    $matchtimestamp = $year.$MMa[$matchmm].$matchdd."1500";                   
                }

                else{
                    //print "&lt;".$htmlline."<br>\n";
                    $matchleaguecupa = explode(">",$htmlline);
                    if ((strlen(strstr($matchleaguecupa[1],"Cup"))>0)||(strlen(strstr($matchleaguecupa[1],"Trophy"))>0)) {
                        $matchleaguecup = "C-".$matchleaguecupa[1];
                    }
                    else{
                    $matchleaguecup = "L-".$matchleaguecupa[1];
                    }
                }
            }
    
            //else{print "&lt;".$htmlline."<br>\n";}
            if (isset($matcha[$matchkey]["match-id"][0])){
                
            }
            else{
                if ($matchcounter != "0"){
                    $matcha[$matchkey]["match-id"][0] = $match_tid;
                    
                }
            }
            if (isset($matcha[$matchkey]["date"][0])){
                
            }
            else{
                if ($matchcounter != "0"){
                    $matcha[$matchkey]["date"][0] = $matchdate;
                }
                }
                if (isset($matcha[$matchkey]["leaguecup"][0])){
                    
                }
                else{
                    if ($matchcounter != "0"){
                        $matcha[$matchkey]["leaguecup"][0] = $matchleaguecup;
                    }
                    }
                    /*if ($i <= 5){
                        print "&lt;".$htmlline."<br>\n";
                    }*/
        }
    }
     
        
        
    XTABLEJQDTID("reporttable_matchlist");
    XTHEAD();
    XTRJQDT();
    XTDHTXT("Match Id.");
    XTDHTXT("Match No.");
    XTDHTXT("Match Date");
    XTDHTXT("Match Attendance");
    XTDHTXT("League/Cup Id");
    XTDHTXT("Home Team Id");
    XTDHTXT("Home Team Name");
    XTDHTXT("Away Team Id");
    XTDHTXT("Away Team Name");
    XTDHTXT("Score");
    XTDHTXT("Home ht goals");
    XTDHTXT("Away ht goals");
    XTDHTXT("Home ft goals");
    XTDHTXT("Away ft goals");
    XTDHTXT("Home Team Player List");
    XTDHTXT("Away Team Player List");
    XTDHTXT("Home Team Stats List");
    XTDHTXT("Away Team Stats List");
    X_TR();
    X_THEAD();
    XTBODY();
    
    foreach ($matcha as $key => $varray) { 
        XTRJQDT();
        XTDTXT($matcha[$key]["match-id"][0]);
        XTDTXT($key);
        XTDTXT($matcha[$key]["date"][0]);
        XTDTXT($matcha[$key]["attendance"][0]);
        XTDTXT($matcha[$key]["leaguecup"][0]);
        XTDTXT($matcha[$key]["teamid"][1]);
        XTDTXT($matcha[$key]["team"][1]);
        XTDTXT($matcha[$key]["teamid"][2]);
        XTDTXT($matcha[$key]["team"][2]);
        XTDTXT($matcha[$key]["score"]);
        XTDTXT($matcha[$key]["hgoals"][1]);
        XTDTXT($matcha[$key]["hgoals"][2]);
        XTDTXT($matcha[$key]["fgoals"][1]);
        XTDTXT($matcha[$key]["fgoals"][2]);
        XTDTXT($matcha[$key]["players"][1]);
        XTDTXT($matcha[$key]["players"][2]);
        XTDTXT($matcha[$key]["goals"][1]);
        XTDTXT($matcha[$key]["goals"][2]);
        X_TR();
        
        //============= Write Match Data =================================
        Initialise_Data('grlmatch');            
        // grlmatch_periodid
        // grlmatch_competitionid
        // grlmatch_id
        Initialise_Data(grlmatch);
        $GLOBALS{'grlmatch_hometeamid'} = $matcha[$key]["teamid"][1];
        $GLOBALS{'grlmatch_hometeamname'} = $matcha[$key]["team"][1]; 
        $GLOBALS{'grlmatch_awayteamid'} = $matcha[$key]["teamid"][2];
        $GLOBALS{'grlmatch_awayteamname'} = $matcha[$key]["team"][2];        
        $GLOBALS{'grlmatch_date'} = substr($matcha[$key]["match-id"][0],0,4)."-".substr($matcha[$key]["match-id"][0],4,2)."-".substr($matcha[$key]["match-id"][0],6,2);
        $GLOBALS{'grlmatch_time'} = "15:00";  
        $GLOBALS{'grlmatch_grlvenueid'} = $matcha[$key]["teamid"][1];
        $GLOBALS{'grlmatch_grlvenuename'} = ""; 
        //  XPTXT( substr($matcha[$key]["match-id"][0],0,8)." vs ".$GLOBALS{'currentYYYYMMDD'} );
        if (substr($matcha[$key]["match-id"][0],0,8) < $GLOBALS{'currentYYYYMMDD'}) {
            $GLOBALS{'grlmatch_hometeamplayerlist'} = $matcha[$key]["players"][1];
            $GLOBALS{'grlmatch_hometeamstatslist'} = $matcha[$key]["goals"][1];
            $GLOBALS{'grlmatch_awayteamplayerlist'} = $matcha[$key]["players"][2];
            $GLOBALS{'grlmatch_awayteamstatslist'} = $matcha[$key]["goals"][2];
            $GLOBALS{'grlmatch_score'} = $matcha[$key]["score"];
            $GLOBALS{'grlmatch_homegfull'} = $matcha[$key]["fgoals"][1];
            $GLOBALS{'grlmatch_homeghalf'} = $matcha[$key]["hgoals"][1];
            $GLOBALS{'grlmatch_awaygfull'} = $matcha[$key]["fgoals"][2];
            $GLOBALS{'grlmatch_awayghalf'} = $matcha[$key]["hgoals"][2];
            $GLOBALS{'grlmatch_attendance'} = $matcha[$key]["attendance"][0];   
        }
          
        if (($matcha[$key]["leaguecup"][0] != "") && ($matcha[$key]["match-id"][0] != "")) {
            Write_Data('grlmatch',$GLOBALS{'currperiodid'},$matcha[$key]["leaguecup"][0],$matcha[$key]["match-id"][0]);
        } else {
            XPTXTCOLOR('grlmatch'."|".$GLOBALS{'currperiodid'}."|".$matcha[$key]["leaguecup"][0]."|".$matcha[$key]["match-id"][0]."| Row has no Key","red");
        }
        //============= Write Match Data =================================
        
    }
    
    X_TBODY();
    X_TABLE();
    
    //------ now complete team data --------------------
    $grlmatcha = Get_Array('grlmatch',$GLOBALS{'currperiodid'},"L-Premier");
    foreach ($grlmatcha as $grlmatchid) { 
        // XPTXT($grlmatchid);
        Get_Data('grlmatch',$GLOBALS{'currperiodid'},"L-Premier",$grlmatchid);
        
        Check_Data ('grlteam',$GLOBALS{'currperiodid'},$GLOBALS{'grlmatch_hometeamid'});
        if ($GLOBALS{'IOWARNING'} == "0") {
            // XPTXT($GLOBALS{'grlmatch_hometeamid'});
            $GLOBALS{'grlteam_squadlist'} = CommaLists_Merge ( $GLOBALS{'grlteam_squadlist'},$GLOBALS{'grlmatch_hometeamplayerlist'});
            Write_Data ('grlteam',$GLOBALS{'currperiodid'},$GLOBALS{'grlmatch_hometeamid'});        
        }
        Check_Data ('grlteam',$GLOBALS{'currperiodid'},$GLOBALS{'grlmatch_awayteamid'});
        if ($GLOBALS{'IOWARNING'} == "0") {
            // XPTXT($GLOBALS{'grlmatch_awayteamid'});
            $GLOBALS{'grlteam_squadlist'} = CommaLists_Merge ( $GLOBALS{'grlteam_squadlist'},$GLOBALS{'grlmatch_awayteamplayerlist'});
            Write_Data ('grlteam',$GLOBALS{'currperiodid'},$GLOBALS{'grlmatch_awayteamid'});
        }
        
    }       
    

    
}

// ================= Widget Tester ==============================


function Grl_GRLWIDGETTEST_CSSJS () {
    
}

function Grl_GRLWIDGETTEST_Output () {
    XH2("GRL Widget Tester");
    
    $link = YPGMLINK("grlwidgettestout.php");
    $link = $link.YPGMSTDPARMS().YPGMPARM("WidgetName","GRLResults");
    XBR();XLINKTXT($link,"GRLResults");
    
    $link = YPGMLINK("grlwidgettestout.php");
    $link = $link.YPGMSTDPARMS().YPGMPARM("WidgetName","GRLLeagueTableA");
    XBR();XLINKTXT($link,"GRLLeagueTableA");
    
    $link = YPGMLINK("grlwidgettestout.php");
    $link = $link.YPGMSTDPARMS().YPGMPARM("WidgetName","GRLLeagueTableB");
    XBR();XLINKTXT($link,"GRLLeagueTableB");
    
    $link = YPGMLINK("grlwidgettestout.php");
    $link = $link.YPGMSTDPARMS().YPGMPARM("WidgetName","GRLResultsGrid");
    XBR();XLINKTXT($link,"GRLResultsGrid");
    
    $link = YPGMLINK("grlwidgettestout.php");
    $link = $link.YPGMSTDPARMS().YPGMPARM("WidgetName","GRLAttendance");
    XBR();XLINKTXT($link,"GRLAttendance");
    
    $link = YPGMLINK("grlwidgettestout.php");
    $link = $link.YPGMSTDPARMS().YPGMPARM("WidgetName","GRLFormTable");
    XBR();XLINKTXT($link,"GRLFormTable");
    
    $link = YPGMLINK("grlwidgettestout.php");
    $link = $link.YPGMSTDPARMS().YPGMPARM("WidgetName","GRLGoalsTable");
    XBR();XLINKTXT($link,"GRLGoalsTable");
    
    $link = YPGMLINK("grlwidgettestout.php");
    $link = $link.YPGMSTDPARMS().YPGMPARM("WidgetName","GRLFTLeagueTable");
    XBR();XLINKTXT($link,"GRLFTLeagueTable");
    
    $link = YPGMLINK("grlwidgettestout.php");
    $link = $link.YPGMSTDPARMS().YPGMPARM("WidgetName","GRLFTResults");
    XBR();XLINKTXT($link,"GRLFTResults");
    
    $link = YPGMLINK("grlwidgettestout.php");
    $link = $link.YPGMSTDPARMS().YPGMPARM("WidgetName","GRLFTFixtures");
    XBR();XLINKTXT($link,"GRLFTFixtures");
}

function Grl_GRLWIDGETTEST2_CSSJS () {
    
}

function Grl_GRLWIDGETTEST2_Output ($widgetname) {
    XH2("GRL Widget Tester - ".$widgetname);
    
    if ( $widgetname == "GRLResults" ) {
        $parma = Array("Premier");
        $whtmla = GRLResultsHTMLAGen($parma);
        foreach ($whtmla as $htmlelement) {
            print $htmlelement;
        }
    }
    if ( $widgetname == "GRLLeagueTableA" ) {
        Grl_RecalcStats($GLOBALS{'currperiodid'},"Premier");
        $parma = Array("Premier");
        $whtmla = GRLLeagueTableAHTMLAGen($parma);
        foreach ($whtmla as $htmlelement) {
            print $htmlelement;
        }
    }
    if ( $widgetname == "GRLLeagueTableB" ) {
        XDIVWIDTH ("B","","30%");
        $parma = Array("Premier");
        $whtmla = GRLLeagueTableBHTMLAGen($parma);
        foreach ($whtmla as $htmlelement) {
            print $htmlelement;
        }
        X_DIV("B");
    }
    if ( $widgetname == "GRLResultsGrid" ) {
        $parma = Array("Premier");
        $htmla = GRLResultsGridHTMLAGen($parma);
        foreach ($htmla as $line){
            print $line;
        }
    }
    if ( $widgetname == "GRLAttendance" ) {
        $parma = Array("Premier");
        $htmla = GRLAttendanceHTMLAGen($parma);
        foreach ($htmla as $line){
            print $line;
        }
    }
    if ( $widgetname == "GRLFormTable" ) {
        $parma = Array("Premier");
        $htmla = GRLFormTableHTMLAGen($parma);
        foreach ($htmla as $line){
            print $line;
        }
    }
    if ( $widgetname == "GRLGoalsTable" ) {
        $parma = Array("Premier");
        $htmla = GRLGoalsTableHTMLAGen($parma);
        foreach ($htmla as $line){
            print $line;
        }
    }
    if ( $widgetname == "GRLFTLeagueTable" ) {
        XDIVWIDTH ("GRLFTLeagueTableDiv","","50%");
        $parma = Array("195936733","867436999");
        $whtmla = GRLFTLeagueTableHTMLAGen($parma);
        foreach ($whtmla as $htmlelement) {
            print $htmlelement;
        }
        X_DIV("GRLFTLeagueTableDiv");
    }
    if ( $widgetname == "GRLFTResults" ) {
        XDIVWIDTH ("GRLFTResults","","50%");
        $parma = Array("195936733","867436999");
        $whtmla = GRLFTResultsHTMLAGen($parma);
        foreach ($whtmla as $htmlelement) {
            print $htmlelement;
        }
        X_DIV("GRLFTResults");
    }
    if ( $widgetname == "GRLFTFixtures" ) {
        XDIVWIDTH ("GRLFTFixturesDiv","","50%");
        $parma = Array("195936733","867436999");
        $whtmla = GRLFTFixturesHTMLAGen($parma);
        foreach ($whtmla as $htmlelement) {
            print $htmlelement;
        }
        X_DIV("GRLFTFixturesDiv");
    }
}

// ================= Widgets ==============================

function Grl_LeagueTableAWidget_CSSJS () {
    
}

function Grl_LeagueTableAWidget_Output($periodid,$leagueid) {
    XH3($leagueid." - ".$periodid);
    $leagueteama = Array();
    $teama = Get_Array('grlleaguetable',$periodid,$leagueid);
    foreach ($teama as $teamid) {
        Get_Data('grlleaguetable',$periodid,$leagueid,$teamid);
        $sortstring1 = substr("0000".$GLOBALS{'grlleaguetable_points'},-4);
        $sortstring2 = substr("0000".(string)(1000+$GLOBALS{'grlleaguetable_tgdiff'}),-4);
        $leagueteamelement = $sortstring1."|".$sortstring2."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_grlteamname'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_played'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_hw'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_hd'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_hl'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_aw'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_ad'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_al'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_tw'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_td'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_tl'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_tgf'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_tga'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_tgdiff'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_points'};
        array_push($leagueteama,$leagueteamelement);
    }
    rsort ($leagueteama);
    
    XDIV("simpletablediv_LeagueA_".$periodid."_".$leagueid,"container");
    XTABLECOMPACTJQDTID("simpletabletable_LeagueA_".$periodid."_".$leagueid);
    XTHEAD();
    XTRJQDT();
    XTDTXT('');
    XTDTXT('');
    XTDTXT('p');
    XTDTXT('hw');
    XTDTXT('hd');
    XTDTXT('hl');
    XTDTXT('aw');
    XTDTXT('ad');
    XTDTXT('al');
    XTDTXT('tw');
    XTDTXT('td');
    XTDTXT('tl');
    XTDTXT('tgf');
    XTDTXT('tga');
    XTDTXT('tgdiff');
    XTDTXT('points');
    X_TR();
    X_THEAD();
    XTBODY();
    
    $li = 0;
    foreach ($leagueteama as $leagueteamelement) {
        // XPTXT($leagueteamelement);
        $rowa = explode('|',$leagueteamelement);
        XTRJQDT();
        $li++;
        XTDTXT($li);
        for ($x = 2; $x <= 16; $x++) {
            XTDTXT($rowa[$x]);
        }
        X_TR();
    }
    
    X_TBODY();
    X_TABLE();
    X_DIV("simpletablediv_LeagueA_".$periodid."_".$leagueid);
    XCLEARFLOAT();
    
}

function Widget_LeagueTableA_Creator($periodid,$leagueid) {
    
    $leagueteama = Array();
    $teama = Get_Array('grlleaguetable',$periodid,$leagueid);
    foreach ($teama as $teamid) {
        Get_Data('grlleaguetable',$periodid,$leagueid,$teamid);
        $sortstring1 = substr("0000".$GLOBALS{'grlleaguetable_points'},-4);
        $sortstring2 = substr("0000".(string)(1000+$GLOBALS{'grlleaguetable_tgdiff'}),-4);
        $leagueteamelement = $sortstring1."|".$sortstring2."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_grlteamname'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_played'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_hw'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_hd'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_hl'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_aw'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_ad'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_al'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_tw'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_td'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_tl'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_tgf'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_tga'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_tgdiff'}."|";
        $leagueteamelement = $leagueteamelement.$GLOBALS{'grlleaguetable_points'};
        array_push($leagueteama,$leagueteamelement);
    }
    rsort ($leagueteama);
    
    $whtmla = Array();
    array_push($whtmla, YH3($leagueid." - ".$periodid));
    
    array_push($whtmla, YDIV("simpletablediv_LeagueA_".$periodid."_".$leagueid,"container"));
    array_push($whtmla, YTABLEJQDTID("simpletabletable_LeagueA_".$periodid."_".$leagueid));
    array_push($whtmla, YTHEAD());
    array_push($whtmla, YTRJQDT());
    array_push($whtmla, YTDTXT(''));
    array_push($whtmla, YTDTXT(''));
    array_push($whtmla, YTDTXT('p'));
    array_push($whtmla, YTDTXT('hw'));
    array_push($whtmla, YTDTXT('hd'));
    array_push($whtmla, YTDTXT('hl'));
    array_push($whtmla, YTDTXT('aw'));
    array_push($whtmla, YTDTXT('ad'));
    array_push($whtmla, YTDTXT('al'));
    array_push($whtmla, YTDTXT('tw'));
    array_push($whtmla, YTDTXT('td'));
    array_push($whtmla, YTDTXT('tl'));
    array_push($whtmla, YTDTXT('tgf'));
    array_push($whtmla, YTDTXT('tga'));
    array_push($whtmla, YTDTXT('tgdiff'));
    array_push($whtmla, YTDTXT('points'));
    array_push($whtmla, Y_TR());
    array_push($whtmla, Y_THEAD());
    array_push($whtmla, YTBODY());
    
    $li = 0;
    foreach ($leagueteama as $leagueteamelement) {
        // XPTXT($leagueteamelement);
        $rowa = explode('|',$leagueteamelement);
        array_push($whtmla, YTRJQDT());
        $li++;
        array_push($whtmla, YTDTXT($li));
        for ($x = 2; $x <= 16; $x++) {
            array_push($whtmla, YTDTXT($rowa[$x]));
        }
        array_push($whtmla, Y_TR());
    }
    
    array_push($whtmla, Y_TBODY());
    array_push($whtmla, Y_TABLE());
    array_push($whtmla, Y_DIV("simpletablediv_LeagueA_".$periodid."_".$leagueid));
    array_push($whtmla, YCLEARFLOAT());
    
    
    $wh = Open_File_Write($GLOBALS{'domainwwwpath'}."/domain_frs/LeagueTableAWidget"."_".$periodid."_".$leagueid.".html");
    foreach ($whtmla as $hmessage) {
        Write_File($wh, $hmessage);
    }
    Close_File_Write($wh);
    
}
function Grl_GRLMATCHAPP_CSSJS () {
    $GLOBALS{'SITEJSOPTIONAL'} = "globalroutines,jqdatatables,grlmatchapp,jqueryconfirm";
}

function Grl_GRLMATCHAPP_Output () {
    XDIV("addeventdiv","");
    BROW();
    BTXTCOLOR("--.","white");
    BCOLTXTCOLOR("ADD EVENT","9","#539D2F","white");
    B_ROW();
    BROW();
    BTXTCOLOR("--.","white");
    BCOLCOLOR("powderblue","","9");
    B_COL();
    B_ROW();
    BROW();
    BTXTCOLOR("--.","white");
    BCOLCOLOR("powderblue","","9");
    BTXTCOLOR("----","powderblue");
    BIMGID("grlgoalicon",$GLOBALS{'site_asseturl'}."/GRLGOAL.png","120");
    BTXTCOLOR("----","powderblue");
    BIMGID("grlcardicon",$GLOBALS{'site_asseturl'}."/GRLCARD.png","120");
    BTXTCOLOR("----","powderblue");
    BIMGID("grlinjuryicon",$GLOBALS{'site_asseturl'}."/GRLINJURY.png","120");
    BTXTCOLOR("----","powderblue");
    BIMGID("grlsubicon",$GLOBALS{'site_asseturl'}."/GRLSUB.png","120");
    B_COL();
    B_ROW();
    BROW();
    BTXTCOLOR("--.","white");
    BCOLCOLOR("powderblue","","9");
    B_COL();
    B_ROW();
    XBR();
    X_DIV("addeventdiv");
    
    XDIV("grlmatchupdatelistend","");
    X_DIV("grlmatchupdatelistend");
}


?>