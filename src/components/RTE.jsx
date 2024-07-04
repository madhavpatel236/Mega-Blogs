// Editor coomponent

import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name, control, lable, defaultValue = '' }) {
    return (
        <div className='w-full'>
            {lable &&
                <lable className='inline-block mb-2 pl-1' >{lable}</lable>
            }

            <Controller /> // Here we use the controller from the react-hook-form because we make a editor in the saperate component (this compponent). so we need use the some referance at the form which is post or blog component so editor can understand that this edit field is for that form.
                name={name || 'content'}
                control={control} // this reference pass thrrough the parent form so from that we can know that this editor was for that form
                render={({ field: { onChange } }) => (  //{ field: { onChange } } => that means if in the <editor /> field any changes may occure then render.
                    <Editor
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            initialValue: defaultValue,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

