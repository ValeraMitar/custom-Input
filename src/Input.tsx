import {FormEvent, HTMLInputTypeAttribute, InputHTMLAttributes, useCallback} from "react";

export type InputProps<T> = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'checked' | 'type'> & {
    model?: T;
    modelChange?: (model: T) => void;
};

type InputStringTypes = 'button'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'image'
    | 'month'
    | 'password'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

export function Input(props: InputProps<string>): JSX.Element;
export function Input(props: {type: InputStringTypes} & InputProps<string>): JSX.Element;
export function Input(props: {type: 'number' | 'range'} & InputProps<number>): JSX.Element;
export function Input(props: {type: 'checkbox' | 'radio', value?: string} & InputProps<boolean>): JSX.Element;
export function Input(props: {type: 'file'} & Omit<InputProps<File[]>, 'model'>): JSX.Element;

export function Input<T>(
    {
        type,
        model,
        modelChange,
        onInput,
        value,
        checked: _checked,
        ...attrs
    }: InputProps<T> & { value?: string; checked?: boolean, type?: HTMLInputTypeAttribute}
): JSX.Element {
    const onInternalInput = useCallback((event: FormEvent<HTMLInputElement>) => {
        if (modelChange) {
            modelChange(getModelByType(type, event.currentTarget) as T);
        }
        onInput?.(event);
    },[modelChange, type, onInput]);

    return (
        <input
            type={type}
            {...getAttrsByType(type, model, value)}
            onInput={onInternalInput}
            {...attrs}
        />
    );
}

function getModelByType(type: InputHTMLAttributes<HTMLInputElement>['type'], input: HTMLInputElement): string | number | boolean | File[] {
    switch (type) {
        case 'number':
        case 'range':
            return input.valueAsNumber;
        case 'radio':
        case 'checkbox':
            return input.checked;
        case 'file':
            return input.files ? [...input.files] : [];
        default:
            return input.value;
    }
}

function getAttrsByType<T>(
    type: InputHTMLAttributes<HTMLInputElement>['type'],
    model: T,
    value: InputHTMLAttributes<HTMLInputElement>['value']
): Partial<{
    checked: InputHTMLAttributes<HTMLInputElement>['checked'],
    value: InputHTMLAttributes<HTMLInputElement>['value'],
}> {
    switch (type) {
        case 'radio':
        case 'checkbox':
            return {
                checked: model as boolean,
                value,
            };
        case 'file':
            return {};
        default:
            return {
                value: model as string,
            };
    }
}
