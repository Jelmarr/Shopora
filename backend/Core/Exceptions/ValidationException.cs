namespace backend.Core.Exceptions.ValidatonException;

public sealed class ValidationException : Exception
{
    public IDictionary<string, string[]> Errors { get; }

    public ValidationException(string propertyName, string errorMessage)
        : base("One or more validation failures occured.")
    {
        Errors = new Dictionary<string, string[]>
        {
            {propertyName, new[] {errorMessage}}
        };
    }

    public ValidationException(IDictionary<string, string[]> errors)
    {
        Errors = errors;
    }
}