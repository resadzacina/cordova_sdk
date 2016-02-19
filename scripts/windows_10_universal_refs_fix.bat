@ECHO OFF

SETLOCAL ENABLEDELAYEDEXPANSION
SET FOUND=0
SET "WIN_10_UAP_PRJ=%1\platforms\windows\CordovaApp.Windows10.jsproj"
SET "WIN_10_UAP_ADD=%1\plugins\com.adjust.sdk\scripts\windows_10_universal.txt"
SET "WIN_10_UAP_REF=plugins\\com.adjust.sdk\\src\\windows\\AdjustUAP10WinRT\\AdjustUAP10WinRT\\bin\\Release\\AdjustWinRT.winmd"
SET "WIN_10_UAP_TMP=temp_win_10.txt"

FOR %%A IN (%WIN_10_UAP_PRJ%) DO (
    REM Look for occurence of AdjustWinRT reference path in jsproj file.
    > NUL FINDSTR /i "%WIN_10_UAP_REF%" "%%~A"
    if ERRORLEVEL 1 (
        REM AdjustWinRT is not added. Add it!
        (
            REM Edit Windows 10 universal project file.
            FOR /F "tokens=*" %%A IN (%WIN_10_UAP_PRJ%) DO (
                REM Disable delayed expansion because of magic ECHO bug-feature that it won't
                REM copy exclamation mark to output file when delayed expansion is enabled.
                SETLOCAL DISABLEDELAYEDEXPANSION
                ECHO %%A
                ENDLOCAL

                REM Locate first occurrence of </ItemGroup> and add reference after it.
                IF "%%A" EQU "</ItemGroup>" (
                    IF !FOUND! EQU 0 (    
                        TYPE !WIN_10_UAP_ADD!
                        SET /A FOUND=%FOUND%+1
                    )
                )
            )
        ) > %WIN_10_UAP_TMP%

        MOVE /Y %WIN_10_UAP_TMP% %WIN_10_UAP_PRJ%
        ECHO Adjust SDK references successfully added to Windows 10 universal project.
    ) else (
        REM AdjustWinRT reference is already added, do nothing.
        ECHO Adjust SDK references already added to Windows 10 universal project.
    )
)

ENDLOCAL
