import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Attribute {
    id : number;
  name: string;
  type: string;
  visibility: string;
}

interface Method {
    id : number;
  name: string;
  properties: { name: string; type: string }[];
  returnType: string;
  visibility: string;
}

interface ClassAttributes {
  name: string;
  attributes: Attribute[];
  methods: Method[];
}

const UMLClassInput: React.FC = () => {
  const [classData, setClassData] = useState<ClassAttributes>({
    name: '',
    attributes: [],
    methods: [],
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassData({ ...classData, name: e.target.value });
  };

  const handleAttributeChange = (index: number, field: 'name' | 'type' | 'visibility', value: any) => {
    const attributes = [...classData.attributes];
    attributes[index][field] = value;
    setClassData({ ...classData, attributes });
  };

  const handleMethodChange = (
    methodIndex: number,
    field: 'name' | 'returnType' | 'visibility',
    value: string
  ) => {
    const methods = [...classData.methods];
    methods[methodIndex][field] = value;
    setClassData({ ...classData, methods });
  };

  const handleMethodPropertyChange = (
    methodIndex: number,
    propertyIndex: number,
    field: 'name' | 'type',
    value: string
  ) => {
    const methods = [...classData.methods];
    methods[methodIndex].properties[propertyIndex][field] = value;
    setClassData({ ...classData, methods });
  };

  const addAttribute = () => {
    setClassData({
      ...classData,
      attributes: [
        ...classData.attributes,
        {  id: classData.methods.length, name: '', type: 'string', visibility: 'public' },
      ],
    });
  };

  const addMethod = () => {
    setClassData({
      ...classData,
      methods: [
        ...classData.methods,
        {  id: classData.methods.length,
          name: '',
          properties: [],
          returnType: '',
          visibility: 'public',
        },
      ],
    });
  };

  const addMethodProperty = (methodIndex: number) => {
    const methods = [...classData.methods];
    methods[methodIndex].properties.push({ name: '', type: 'string' });
    setClassData({ ...classData, methods });
  };

  const removeAttribute = (index: number) => {
    const attributes = [...classData.attributes];
    attributes.splice(index, 1);
    setClassData({ ...classData, attributes });
  };

  const removeMethod = (index: number) => {
    const methods = [...classData.methods];
    methods.splice(index, 1);
    setClassData({ ...classData, methods });
  };

  const removeMethodProperty = (methodIndex: number, propertyIndex: number) => {
    const methods = [...classData.methods];
    methods[methodIndex].properties.splice(propertyIndex, 1);
    setClassData({ ...classData, methods });
  };

  const convertToCamelCase = (str: string): string => {
    return str
      .split(' ')
      .map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  };

  const camelCaseName = convertToCamelCase(classData.name);

  return (
    <div className="bg-white rounded-md shadow-md p-6 w-50 h-50">
    {/* Class Name */}
    <div className="mb-4">
      <label htmlFor="className" className="block font-medium mb-2">
        Class Name
      </label>
      <input
        type="text"
        id="className"
        value={classData.name}
        onChange={handleNameChange}
        className="border rounded-md px-3 py-2 w-full"
      />
      {classData.name && (
        <p className="text-gray-500 mt-2">Class Code: {camelCaseName}</p>
      )}
    </div>
      {/* Attributes */}
      <div className="mb-4">
        <label htmlFor="attributes" className="block font-medium mb-2">
          Attributes
        </label>
        {classData.attributes.map((attr, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="mr-2">{attr.id + 1}.</span>
            <input
              type="text"
              value={attr.name}
              onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
              className="border rounded-md px-3 py-2 flex-grow mr-2"
              placeholder="Attribute Name"
            />
            <select
              value={attr.type}
              onChange={(e) =>
                handleAttributeChange(index, 'type', e.target.value as 'string' | 'float' | 'int' | 'double' | 'bool' | 'date')
              }
              className="border rounded-md px-3 py-2 flex-grow mr-2"
            >
              {/* Options omitted for brevity */}
            </select>
            <select
              value={attr.visibility}
              onChange={(e) =>
                handleAttributeChange(index, 'visibility', e.target.value as 'public' | 'private' | 'protected' | 'package')
              }
              className="border rounded-md px-3 py-2 flex-grow mr-2"
            >
              {/* Options omitted for brevity */}
            </select>
            <button
              type="button"
              onClick={() => removeAttribute(index)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAttribute}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          Add Attribute
        </button>
      </div>

      {/* Methods */}
      <div className="mb-4">
        <label htmlFor="methods" className="block font-medium mb-2">
          Methods
        </label>
        {classData.methods.map((method, methodIndex) => (
          <div key={methodIndex} className="mb-4">
            <div className="flex items-center mb-2">
            <span className="mr-2">{method.id + 1}.</span>

              <input
                type="text"
                value={method.name}
                onChange={(e) => handleMethodChange(methodIndex, 'name', e.target.value)}
                className="border rounded-md px-3 py-2 flex-grow mr-2"
                placeholder="Method Name"
              />
              <select
                value={method.returnType}
                onChange={(e) => handleMethodChange(methodIndex, 'returnType', e.target.value)}
                className="border rounded-md px-3 py-2 flex-grow mr-2"
              >
                {/* Options omitted for brevity */}
              </select>
              <select
                value={method.visibility}
                onChange={(e) =>
                  handleMethodChange(
                    methodIndex,
                    'visibility',
                    e.target.value as 'public' | 'private' | 'protected'
                  )
                }
                className="border rounded-md px-3 py-2 flex-grow mr-2"
              >
                {/* Options omitted for brevity */}
              </select>
              <button
                type="button"
                onClick={() => removeMethod(methodIndex)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="mb-2 ml-8">
              {method.properties.map((prop, propIndex) => (
                <div key={propIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={prop.name}
                    onChange={(e) => handleMethodPropertyChange(methodIndex, propIndex, 'name', e.target.value)}
                    className="border rounded-md px-3 py-2 flex-grow mr-2"
                    placeholder="Property Name"
                  />
                  <select
                    value={prop.type}
                    onChange={(e) =>
                      handleMethodPropertyChange(
                        methodIndex,
                        propIndex,
                        'type',
                        e.target.value as 'string' | 'float' | 'int' | 'double' | 'bool' | 'date'
                      )
                    }
                    className="border rounded-md px-3 py-2 flex-grow mr-2"
                  >
                    {/* Options omitted for brevity */}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeMethodProperty(methodIndex, propIndex)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addMethodProperty(methodIndex)}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                Add Property
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addMethod}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          Add Method
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </div>
    </div>
  );
};

export default UMLClassInput;