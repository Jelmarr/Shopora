namespace backend.Core.Extensions.StringExtension;

public static class StringExtension
{
    public static string ToCapitalized(this string input)
    {
        var trimmed = input.Trim();
        return trimmed.Length > 0
            ? char.ToUpperInvariant(trimmed[0]) + trimmed[1..]
            : trimmed;
    }
}