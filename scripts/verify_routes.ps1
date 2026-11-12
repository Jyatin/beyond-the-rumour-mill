$routes = @(
  @{ name = 'Home'; url = 'http://localhost:3000/' },
  @{ name = 'Sign Up'; url = 'http://localhost:3000/signup' },
  @{ name = 'Sign In'; url = 'http://localhost:3000/login' },
  @{ name = 'Companies Directory'; url = 'http://localhost:3000/companies' },
  @{ name = 'Philips Dossier'; url = 'http://localhost:3000/companies/philips' },
  @{ name = 'Wissen Dossier'; url = 'http://localhost:3000/companies/wissen' },
  @{ name = 'Adobe Dossier'; url = 'http://localhost:3000/companies/adobe' },
  @{ name = 'Preparation Hub'; url = 'http://localhost:3000/prepare' },
  @{ name = 'Alumni Directory'; url = 'http://localhost:3000/alumni' },
  @{ name = 'Questions Board'; url = 'http://localhost:3000/questions' },
  @{ name = 'Experiences Archive'; url = 'http://localhost:3000/experiences' }
)

Write-Host "================ ROUTE & SIGNUP QA REPORT ================"
foreach ($r in $routes) {
  try {
    $res = Invoke-WebRequest -Uri $r.url -UseBasicParsing -TimeoutSec 25
    $hasSignup = ($res.Content -match 'signup' -or $res.Content -match 'Sign Up')
    $hasButtons = ($res.Content -match '<button' -or $res.Content -match 'role="button"')
    Write-Host ("PASS: " + $r.name.PadRight(22) + " [HTTP " + $res.StatusCode + "] | SignUp Visible: " + $hasSignup + " | Buttons OK: " + $hasButtons + " | Size: " + $res.Content.Length + " bytes")
  } catch {
    Write-Host ("FAIL: " + $r.name.PadRight(22) + " Error: " + $_.Exception.Message)
  }
}
Write-Host "=========================================================="
