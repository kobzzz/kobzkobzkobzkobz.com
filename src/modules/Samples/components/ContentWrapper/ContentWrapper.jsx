import React, {
  forwardRef, useCallback, useState, useContext,
} from 'react';

import { ResizeContext } from 'src/core/UserMotion/Resize/Resize.context';

import {
  Canvas, Content, Title, Subtitle,
  DescriptionWrapper, ContentContainer,
  ContentWrapperStyled, ContentHeader,
} from './ContentWrapper.styled';

export const ContentWrapper = forwardRef(({
  title, subtitle, Description, loaded,
}, ref) => {
  const { height, width } = useContext(ResizeContext);

  const [headingHeight, setHeadingHeight] = useState();

  const contentHeaderCallbackRef = useCallback((node) => {
    if (!node) {
      return;
    }

    const { height: contentHeaderHeight } = node.getBoundingClientRect();
    setHeadingHeight(contentHeaderHeight);
  }, []);

  return (
    <ContentWrapperStyled height={height} width={width}>
      <Canvas ref={ref} />

      {loaded && (
        <ContentContainer headingHeight={headingHeight} innerHeight={window.innerHeight} height={height}>
          <Content>
            <ContentHeader ref={contentHeaderCallbackRef}>
              {subtitle && (
                <Subtitle>
                  {subtitle}
                </Subtitle>
              )}

              <Title>
                {title}
              </Title>
            </ContentHeader>

            <DescriptionWrapper>
              {Description}
            </DescriptionWrapper>
          </Content>
        </ContentContainer>
      )}
    </ContentWrapperStyled>
  );
});
