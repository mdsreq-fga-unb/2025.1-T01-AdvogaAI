'use client';

import { useState } from 'react';

import { ModeloDocumento } from '@/modules/document-models/api/documentModelsSchema';
import { ListDocuments } from './components/ListDocumentsComponent';
import { FillModelComponent } from './components/FillModelComponent';

export default function DocModelPage() {
  const [isFillingModel, setIsFillingModel] = useState<boolean>(false);
  const [modelToFill, setModelToFill] = useState<ModeloDocumento | null>(null);

  return (
    <>
      {!isFillingModel && (
        <ListDocuments
          setModelToFill={setModelToFill}
          setIsFillingModel={setIsFillingModel}
        />
      )}
      {isFillingModel && (
        <FillModelComponent
          setIsFillingModel={setIsFillingModel}
          modelToFill={modelToFill}
        />
      )}
    </>
  );
}
