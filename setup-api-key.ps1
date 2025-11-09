# AfriKreate - Alchemy API Key Setup Script
# This script creates the .env file with your API key

Write-Host "🚀 Setting up Alchemy API Key for AfriKreate..." -ForegroundColor Cyan
Write-Host ""

# Create .env file with API key
$envContent = "REACT_APP_ALCHEMY_API_KEY=5oEyfGuCSCSIMCmKp00B0"

# Write to .env file
Set-Content -Path ".env" -Value $envContent

Write-Host "✅ .env file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Contents:" -ForegroundColor Yellow
Get-Content ".env"
Write-Host ""
Write-Host "🎉 All set! Now restart your app with: npm start" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: You MUST restart your development server for changes to take effect!" -ForegroundColor Yellow
