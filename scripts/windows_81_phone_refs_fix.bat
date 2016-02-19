@ECHO OFF

SETLOCAL ENABLEDELAYEDEXPANSION
SET FOUND=0
SET "WIN_81_WP_PRJ=%1\platforms\windows\CordovaApp.Phone.jsproj"
SET "WIN_81_WP_ADD=%1\plugins\com.adjust.sdk\scripts\windows_81_phone.txt"
SET "WIN_81_WP_REF=plugins\\com.adjust.sdk\\src\\windows\\AdjustWP81WinRT\\AdjustWP81WinRT\\bin\\Release\\AdjustWinRT.winmd"
SET "WIN_81_WP_TMP=temp_wp_81.txt"

FOR %%A IN (%WIN_81_WP_PRJ%) DO (
    REM Look for occurence of AdjustWinRT reference path in jsproj file.
    > NUL FINDSTR /i "%WIN_81_WP_REF%" "%%~A"
    if ERRORLEVEL 1 (
        REM AdjustWinRT is not added. Add it!
        (
            REM Edit Windows Phone 8.1 project file.
            FOR /F "tokens=*" %%A IN (%WIN_81_WP_PRJ%) DO (
                REM Disable delayed expansion because of magic ECHO bug-feature that it won't
                REM copy exclamation mark to output file when delayed expansion is enabled.
                SETLOCAL DISABLEDELAYEDEXPANSION
                ECHO %%A
                ENDLOCAL

                REM Locate first occurrence of </ItemGroup> and add reference after it.
                IF "%%A" EQU "</ItemGroup>" (
                    IF !FOUND! EQU 0 (    
                        TYPE !WIN_81_WP_ADD!
                        SET /A FOUND=%FOUND%+1
                    )
                )
            )
        ) > %WIN_81_WP_TMP%

        MOVE /Y %WIN_81_WP_TMP% %WIN_81_WP_PRJ%
        ECHO Adjust SDK references successfully added to Windows Phone 8.1 project.
    ) else (
        REM AdjustWinRT reference is already added, do nothing.
        ECHO Adjust SDK references already added to Windows Phone 8.1 project.
    )
)

ENDLOCAL
