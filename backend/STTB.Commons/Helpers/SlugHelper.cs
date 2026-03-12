using System;
using System.Text.RegularExpressions;

namespace STTB.Commons.Helpers;

public static class SlugHelper
{
    public static string GenerateSlug(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            return Guid.NewGuid().ToString().Substring(0, 8);

        var slug = title.ToLowerInvariant();
        
        // Replace invalid chars with empty string
        slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
        
        // Replace spaces and multiple hyphens with a single hyphen
        slug = Regex.Replace(slug, @"\s+", "-").Trim('-');
        slug = Regex.Replace(slug, @"-+", "-");

        if (string.IsNullOrWhiteSpace(slug))
            return Guid.NewGuid().ToString().Substring(0, 8);

        return slug;
    }
}
