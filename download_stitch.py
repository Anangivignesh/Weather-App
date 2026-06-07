import os
import urllib.request
import ssl

# Bypass SSL certificate verification if needed
ssl._create_default_https_context = ssl._create_unverified_context

screens = [
    {
        "id": "bcb061c37c1647f68c3b2c68e283ce03",
        "title": "Aether Weather - Locations (Day)",
        "screenshot": "https://lh3.googleusercontent.com/aida/AP1WRLulnnDgW2BNKn-4IvqD-kAH1ghHMaiYWATvi-rcuH7ODeuJo8GKTSOx7ME7adMJkuFtPeN-2d4tppsE133k4fnRDTuho8gDyryIKgono2KE747IRCzGHOgR7k7qfVYda2wT-z5TSMff5-2YH1zHnxzZm36PK7kDpxcbdzFsFV4Ihhm-hxb-Ys70vHP6dGrMZ29McIzh5XGS_TMeqHekRcVl4ZnfKLPgZ0HXlFqbCn-QFGPfT61AMLCDVf8",
        "html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1M2E3ODNiMTdlYjMwMWE2MzE3OGI3MDAxMjEyEgsSBxDxlrmn1xQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNjU5NDY4OTQ0MzMzNzg3NQ&filename=&opi=89354086"
    },
    {
        "id": "3085da68c7e4459fa46ded6bedf9c1cd",
        "title": "Aether Weather - Alerts",
        "screenshot": "https://lh3.googleusercontent.com/aida/AP1WRLsApxhhIbayqfNkld0HK2xq0bSar5XsIy92qjLSvPIhc8epwF4nez028GvQVCT2JzrByQJH0__wb2FfSgoyw6JD5kK12hrpziJHJ2ZYL98ZhMG9DUqB4fpvhbR0mQQRQEk9jt-ea5-9Sf7eiBcAYOYcMrzRwFcOP3Jt8lVdeBzO6gWocSx7o69wFMscS74417AcPey59Ricw7XJtSZ2AGaCA-cEkBy9CyY0fGiId24UAM0vtwgNYtD1n50B",
        "html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1M2E3ODJjNjM5YWYwMzgzOGNkZWM2MjM4ODYxEgsSBxDxlrmn1xQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNjU5NDY4OTQ0MzMzNzg3NQ&filename=&opi=89354086"
    },
    {
        "id": "3b8f25df323c42e9a6cba18e3323acd8",
        "title": "Aether Weather - Dashboard",
        "screenshot": "https://lh3.googleusercontent.com/aida/AP1WRLv9yrNYcVqQ8FLO9Nd-qqViBMSb5ijDBLH9FGIliXKoEKb0DR0E8rIgkxEpek6nCzXQiz5XfVRigLhq8GVdi-RZ56Zx5DZoT9dNfzrU1LFWtCdJh4Cbvs-t7yBHM0yKWE6HL9zGNw87SAoo8dKQW2SwGjKs3LwrFajs0ScO3MFVN2_HDeiQMe6_vRNGGy7d1q8VI3xTKD9IPAr4ipgQ2OwitALmcF8k-aktmz-b8LofWA_9vEBaDAGCoHU",
        "html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1M2E3ODMxMzVhZDYwNDMxMTgzNmRmMmYxNjJjEgsSBxDxlrmn1xQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNjU5NDY4OTQ0MzMzNzg3NQ&filename=&opi=89354086"
    },
    {
        "id": "5c358f17dbe44b718edbd4d3fee36968",
        "title": "Aether Weather - Dashboard (Day)",
        "screenshot": "https://lh3.googleusercontent.com/aida/AP1WRLt7l-bzJC_g4JAGmNqsyy4PVTnptiCBBj7Om8-nOaW9lOi5MzfNVnAaELYMKmYgeKF3GlmCzEc5rqhidZYpCJPnDL1bNPZ5EnFvgbBPi8N0ns9XZccv9vc4UVLmd9SlfnrFdIDANitMj7TxLfv8UIKx414sVwZEaV9a3F_o4c9XrVI0J0x_SCRFOT_RxcQRP0PFYzWxtaMsW6vkgOQ5Qt3DD77ABVYSXoWZAthLAo7AYSt5CghBptN2kVIC",
        "html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1M2E3ODNjMzc5NDcwODE2ZmVkMDJlMzI0MjkyEgsSBxDxlrmn1xQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNjU5NDY4OTQ0MzMzNzg3NQ&filename=&opi=89354086"
    },
    {
        "id": "6d5aa5f5c5414bb09889bb7768976816",
        "title": "Aether Weather - Alerts (Day)",
        "screenshot": "https://lh3.googleusercontent.com/aida/AP1WRLF3Lt9PIkRrv9omwSRmo4-DArDY3CGKCAP3ZB-QY45B5CKpsWo8-aWx6fONA_mzbGGFZASfUV22VnF-CRK43trttyznrzIb-pyqs-L7lJCRygJNRf0dXRVqvbcErhzRK9_tuEEn4wxyCHwwkZWViRlmRDEmWt0s7UkNOAEtxND5y_-uDQcpCHCuPY6wc5Md4G3AQWISS8untNQLsnu7cnSABO0EolAiBhz-lZK1SKe1Yv1tYb7FDE8pumL",
        "html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1M2E3ODNkNTM2NTAwNzA5MjFjYmIzMThiMDI5EgsSBxDxlrmn1xQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNjU5NDY4OTQ0MzMzNzg3NQ&filename=&opi=89354086"
    },
    {
        "id": "bb1f025efaec4c67bdea202f12b85ecf",
        "title": "Aether Weather - Map (Day)",
        "screenshot": "https://lh3.googleusercontent.com/aida/AP1WRLteiabunP8TjSPqroXXJ4GEv1Fm5B205NYQmO4VrCYwR1g5eU6kbd9qpGWsj4rpORF2KGQTIbiIUKwEkt34JeIj8YCZkdjcZGtV9iY-QBzbMvp08w3QA_nQncmjIdQq4paBFYPuS_ETEZBvO5y-HV-NEmINfzeoKSQHjcf6hch3rTLca_bf_xQ5JhaGUP7-yEreM3jufi8mixbxkyRmK0Ub_p6M9Sdt8lRNP17VJcW932j9U0fs2QJ54_PL",
        "html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1M2E3ODNmODU0YTEwMzM4NWNkMzdhMDYxYWFhEgsSBxDxlrmn1xQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNjU5NDY4OTQ0MzMzNzg3NQ&filename=&opi=89354086"
    },
    {
        "id": "004f2713e21447acb5a9aa1204278adb",
        "title": "Aether Weather - Map",
        "screenshot": "https://lh3.googleusercontent.com/aida/AP1WRLuDIuOLZ60T9p9plQaDjNzQKE7ZOemtpF-Q417-SbcSVZDFg-nF_Hb1ql7o1bpFmR2HvFYRs4Tr9ZH72Hk_XSEss8VuVn3egfeMFEMMuEMBivJfv2FfvcNyscI7tnBl1betKVOFBWXQXNNKXhW06lFNiuMTMD32SWNXWT9flx6xNL46O7SfcPtYDHbG7hfHxptpv_tqyDJDuMKAjvJ_xBj1G4-JYJWzjlXFi_FjszKV9So-RdsUhX87njDg",
        "html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1M2E3ODJlODYwZTEwNzA5MWI2NDFhMzA3ZmNhEgsSBxDxlrmn1xQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNjU5NDY4OTQ0MzMzNzg3NQ&filename=&opi=89354086"
    },
    {
        "id": "07ca3c4ebfad4eb89d44fb4f39143c2d",
        "title": "Aether Weather - Locations",
        "screenshot": "https://lh3.googleusercontent.com/aida/AP1WRLu0OEDpqI5Z1HeHchpRo_qfxh8o3D9PwrFEXl_4A84DWmsaP9MbLnXkwVAWNcy7M_wG8m5UQPgL_xz3WEwS6iVeLR33BNoXZT9lwVaXuaIMAnk-I9SZkV-JCHsiYlvh47mqkvMC_8qcg_HR31voYV9kXsn8zMr9Na5ZavTHdg-HhEVBAPhDIrygiWa7nyZu_MCewZJPzidAjFRzX0EdryqMDQknlhzvIAO6cljC3A_Dqq4uSKRl2bfXLd6W",
        "html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1M2E3ODMzZjRhNzUwMWE2MzE3OGI3MDAxMjEyEgsSBxDxlrmn1xQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjMzNjU5NDY4OTQ0MzMzNzg3NQ&filename=&opi=89354086"
    }
]

os.makedirs("stitch_downloads", exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for screen in screens:
    title = screen["title"]
    clean_title = title.lower().replace(" - ", "_").replace(" (", "_").replace(")", "").replace(" ", "_")
    
    html_path = f"stitch_downloads/{clean_title}.html"
    img_path = f"stitch_downloads/{clean_title}.png"
    
    print(f"Downloading {title}...")
    try:
        # Download HTML
        req = urllib.request.Request(screen["html"], headers=headers)
        with urllib.request.urlopen(req) as response:
            html_content = response.read().decode('utf-8')
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(html_content)
        print(f"  Saved HTML to {html_path}")
    except Exception as e:
        print(f"  Error downloading HTML for {title}: {e}")
        
    try:
        # Download Image
        req = urllib.request.Request(screen["screenshot"], headers=headers)
        with urllib.request.urlopen(req) as response:
            img_content = response.read()
            with open(img_path, 'wb') as f:
                f.write(img_content)
        print(f"  Saved Image to {img_path}")
    except Exception as e:
        print(f"  Error downloading Image for {title}: {e}")

print("Done downloading assets!")
