(function(window, document, $, undefined) {

    $(function() {

        // init global operate
        fnInitGlobalOperate();

        // init surprise operate
        fnInitSurpriseOperate();

        // init regular operate
        fnInitRegularOperate();

        // init image cropper
        fnInitImageCropper();
    });

    // func of init global operate
    function fnInitGlobalOperate() {
        var $page = $('#basketPage'),
            $basketContainer = $page.find('.basket-container');

        // check on/off basket items
        $basketContainer.on('click', '.btn-ckbox', function(e) {
            var isChecked = $(this).hasClass('checked');
            if (!isChecked) {
                $(this).addClass('checked');
            } else {
                $(this).removeClass('checked');
            }
        });

        // 数量切换
        (function($wrap) {

            // 增加数量
            $wrap.find('.item').not('.soldout').on('click', '.btn-add', function(e) {
                var $input = $(this)
                    .prev('.amount-wrap')
                    .find('.txt-amount'),
                    amount = parseInt($input.val());
                amount++;
                if (amount > 1) {
                    $(this)
                        .siblings('.btn-sub')
                        .removeClass('disabled');
                }
                $input.val(amount);
            });

            // 减少数量
            $wrap.find('.item').not('.soldout').on('click', '.btn-sub', function(e) {
                if ($(this).hasClass('disabled')) {
                    return false;
                }
                var $input = $(this)
                    .next('.amount-wrap')
                    .find('.txt-amount'),
                    amount = parseInt($input.val());
                amount--;
                if (amount <= 1) {
                    $(this).addClass('disabled');
                }
                $input.val(amount);
            });
        })($basketContainer);

        // 删除商品
        $basketContainer.on('click', '.btn-del-item', function(e) {
            var $item = $(this).closest('.item'),
                $list = $item.parent('ul');

            // TODO 删除提示

            // 删除之前，当前列表只剩一个商品，当前列表也删除
            if ($list.find('.item').length == 1) {
                $list.remove();
            }

            $item.remove();
        });

        // 优惠购
        (function($wrap) {
            var $view = $wrap.find('.view-privilege');

            // toggle wrap
            $view.on('click', '>p', function(e) {
                var isActive = $(this).hasClass('active');
                if (!isActive) {
                    $(this)
                        .addClass('active')
                        .next('.privilege-wrap')
                        .fadeIn();
                } else {
                    $(this)
                        .removeClass('active')
                        .next('.privilege-wrap')
                        .fadeOut();
                }
            });

            // close wrap
            $view.on('click', '.close-privilege-wrap', function(e) {
                var $privilegeWrap = $(this).parent('.privilege-wrap'),
                    $paragraph = $privilegeWrap.prev('p');

                $privilegeWrap.fadeOut();
                $paragraph.removeClass('active');
            });

            // checked privilege
            $view.on('click', '.btn-ckbox-p', function(e) {
                var isChecked = $(this).hasClass('checked');
                if (!isChecked) {
                    $(this).addClass('checked');
                } else {
                    $(this).removeClass('checked');
                }
            });

            // remove privilege
            $view.on('click', '.btn-del-p', function(e) {
                var $item = $(this).closest('li'),
                    $list = $(this).closest('.privilege-list');

                // TODO 删除提示

                // 删除之前，当前列表只剩一个商品，当前列表也删除
                if ($list.find('li').length == 1) {
                    $list.closest('.view-privilege').remove();
                }

                $item.remove();
            });
        })($basketContainer);
    }

    // func of init surprise operate
    function fnInitSurpriseOperate() {
        var $page = $('#basketPage'),
            $surprise = $page.find('.surprise-list');

        // view surprise
        $surprise.on('click', '.view-surprise', function(e) {
            var isActive = $(this).hasClass('active');
            if (!isActive) {
                $(this).addClass('active');
                $(this).next('.surprise-wrapper').slideDown();
            } else {
                $(this).removeClass('active');
                $(this).next('.surprise-wrapper').slideUp();
            }
        });

        // check on/off radio-box
        $surprise.on('click', '.radio-box p', function(e) {
            $(this)
                .addClass('checked')
                .parent('.radio-box')
                .siblings('.radio-box')
                .children('p')
                .removeClass('checked');

            // set the input focus if this item be other-box
            if ($(this).parent('.radio-box').hasClass('other-box')) {
                $(this).next('.txt-other').focus();
            }
        });

        // focus other input
        $surprise.on('focus', '.txt-other', function(e) {
            $(this)
                .prev('p')
                .addClass('checked')
                .parent('.radio-box')
                .siblings('.radio-box')
                .children('p')
                .removeClass('checked');
        });

        // maxlength setting about summary
        $surprise.find('.txt-summary').maxlength({
            max: 100,
            feedbackText: '还可输入{r}字'
        });
    }

    // func of init regular operate
    function fnInitRegularOperate() {
        var $page = $('#basketPage'),
            $regular = $page.find('.regular-list');

        // upload image
        $regular.on('click', '.upload-img', function(e) {
            var isActive = $(this).hasClass('active');
            if (!isActive) {
                $(this).addClass('active');
                $(this).next('.upload-wrapper').slideDown();
            } else {
                $(this).removeClass('active');
                $(this).next('.upload-wrapper').slideUp();
            }
        });
    }

    // handle for image cropper
    function fnInitImageCropper() {
        var $page = $('#basketPage'),
            $imgCropper = $('#imgCropper'),
            $body = $imgCropper.find('.container-body'),
            $image = $body.find('.image'),
            $footer = $imgCropper.find('.container-footer'),
            $inputImage;

        var options = {
            aspectRatio: 1 / 1,
            preview: '.img-preview'
        };

        // init cropper
        $image.on({
            'build.cropper': function(e) {
                console.log(e.type);
            },
            'built.cropper': function(e) {
                console.log(e.type);
            },
            'cropstart.cropper': function(e) {
                console.log(e.type, e.action);
            },
            'cropmove.cropper': function(e) {
                console.log(e.type, e.action);
            },
            'cropend.cropper': function(e) {
                console.log(e.type, e.action);
            },
            'crop.cropper': function(e) {
                console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
            },
            'zoom.cropper': function(e) {
                console.log(e.type, e.ratio);
            }
        }).cropper(options);

        // Methods
        $footer.on('click', '.zoom-in', function(e) {

            // Zoom in
            $image.cropper("zoom", 0.1);
        }).on('click', '.zoom-out', function(e) {

            // Zoom out
            $image.cropper("zoom", -0.1);
        }).on('click', '.btn-cut', function(e) {

            // Get cropped image
            var img = $image.cropper('getCroppedCanvas').toDataURL('image/jpeg');
            var thumbImg = $image.cropper('getCroppedCanvas', {
                width: 90,
                height: 90
            }).toDataURL('image/jpeg');

            if (!!$inputImage) {
                var imgType = $inputImage.attr('data-imgtype');
                if (imgType == 'surprise') {
                    var _html = '';
                    _html += '<div class="img uploaded">';
                    _html += '<img src="' + thumbImg + '" data-image="' + img + '">';
                    _html += '<a href="javascript:;" class="btn-preview"></a>';
                    _html += '</div>';
                    _html += '<div class="text">';
                    _html += '<p>有照片有惊喜！(非必填)</p>';
                    _html += '<div class="btns clearfix">';
                    _html += '<label for="reuploadImage" class="btn btn-reupload">';
                    _html += '<span>重新上传</span>';
                    _html += '<input type="file" class="sr-only reupload-image" data-imgtype="surprise" id="reuploadImage" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff">';
                    _html += '</label>';
                    _html += '<a href="javascript:;" class="btn-del-image">删除</a>';
                    _html += '</div></div>';
                    $inputImage
                        .closest('.upload-wrap')
                        .html(_html);
                }
            }

            // hide image cropper
            $imgCropper.hide();
        });

        // Import/Reupload image
        $page.on('click', '.import-image, .reupload-image', function(e) {
            $inputImage = $(this);
            var URL = window.URL || window.webkitURL;
            var blobURL;

            if (URL) {
                $inputImage.change(function() {
                    var files = this.files;
                    var file;

                    if (!$image.data('cropper')) {
                        return;
                    }

                    if (files && files.length) {
                        file = files[0];

                        if (/^image\/\w+$/.test(file.type)) {
                            blobURL = URL.createObjectURL(file);
                            $image.one('built.cropper', function() {

                                // Revoke when load complete
                                URL.revokeObjectURL(blobURL);
                            }).cropper('reset').cropper('replace', blobURL);
                            $inputImage.val('');
                            // show imgcropper container
                            $imgCropper.show();
                        } else {
                            window.alert('Please choose an image file.');
                        }
                    }
                });
            }
        });

        // Close cropper
        $imgCropper.on('click', '.close-imgcropper', function(e) {
            $imgCropper.hide();
        });

        // Reload image
        (function($image) {
            var $reloadImage = $('#reloadImage');
            var URL = window.URL || window.webkitURL;
            var blobURL;

            if (URL) {
                $reloadImage.change(function() {
                    var files = this.files;
                    var file;

                    if (!$image.data('cropper')) {
                        return;
                    }

                    if (files && files.length) {
                        file = files[0];

                        if (/^image\/\w+$/.test(file.type)) {
                            blobURL = URL.createObjectURL(file);
                            $image.one('built.cropper', function() {

                                // Revoke when load complete
                                URL.revokeObjectURL(blobURL);
                            }).cropper('reset').cropper('replace', blobURL);
                            $reloadImage.val('');
                        } else {
                            window.alert('Please choose an image file.');
                        }
                    }
                });
            }
        })($image);
    }

})(window, document, jQuery);
