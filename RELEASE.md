# To release to staging
Simply push to main

# To release to production
1. Update package.json version
2. Commit changes to package.json
3. Add release tag `git tag release@0.X.0`
4. Push tag to main `git push origin release@0.X.0`