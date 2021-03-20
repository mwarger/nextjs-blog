import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'

export default function Code({
  children,
  className,
}: {
  children: string
  className: string
}) {
  const language = className.replace(/language-/, '') as Language
  return (
    <div className="flex flex-row">
      <Highlight
        {...defaultProps}
        theme={theme}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              overflow: 'auto',
              marginTop: 5,
              marginBottom: 5,
              padding: 8,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            {tokens.map((line, i) => (
              <div key={i}>
                <span>{i + 1}</span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              overflow: 'auto',
              marginTop: 5,
              marginBottom: 5,
              padding: 8,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              width: '100%',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
