import React from 'react'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import '../node_modules/react-quill/dist/quill.snow.css'

const RQuill = ({ body, setBody }) => {
  return (
    <ReactQuill
      placeholder="Write amazing blog ..."
      value={body}
      onChange={html => setBody(html)}
      modules={{
        toolbar: {
          container: [
            [
              { header: '1' },
              { header: '2' },
              { header: [3, 4, 5, 6] },
              { font: [] }
            ],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['code-block']
          ]
        }
      }}
    />
  )
}

export default RQuill
